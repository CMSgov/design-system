import { h, render, ComponentFactory, FunctionComponent } from 'preact';
import {
  IProps,
  ErrorTypes,
  CustomElement,
  isPromise,
  parseJson,
  getElementTag,
  getPropKey,
  getElementAttributes,
  getAsyncComponent,
} from './shared';
import { parseHtml } from './parse';
import { IOptions, ComponentFunction } from './model';
import { kebabCaseIt } from 'case-it/kebab';

/* -----------------------------------
 *
 * Define
 *
 * -------------------------------- */

function define<P = {}>(
  tagName: string,
  componentFunction: ComponentFunction<P>,
  options: IOptions = {}
): FunctionComponent<P> {
  const { wrapComponent } = options;
  const preRender = typeof window === 'undefined';
  const elementTag = getElementTag(tagName);

  if (!preRender) {
    customElements.define(elementTag, createCustomElement(componentFunction, options));

    return;
  }

  let component = componentFunction();

  if (isPromise(component)) {
    throw new Error(`${ErrorTypes.Promise} : <${tagName}>`);
  }

  if (wrapComponent) {
    component = wrapComponent(component);
  }

  const attributes: Record<string, any> = { server: true };
  return (props: P) =>
    h(elementTag, attributes, [
      h('script', {
        type: 'application/json',
        dangerouslySetInnerHTML: { __html: JSON.stringify(props) },
      }),
      h(component, props),
    ]);
}

/**
 * Returns a custom element class for this component, which the browser can use to
 * instantiate new instances of the web component when it finds one in the DOM. The
 * expectation is that the returned class (the constructor) will be passed to the
 * `customElements.define` function to register it with the browser.
 */
function createCustomElement<T>(
  componentFunction: ComponentFunction<T>,
  options: IOptions = {}
): any {
  const { attributes = [] } = options;

  class CustomElement extends HTMLElement {
    __mounted = false;
    __componentFunction = componentFunction;
    __properties = {};
    __slots = {};
    __children = void 0;
    __options = options;

    static observedAttributes = ['props', ...attributes];

    public connectedCallback() {
      onConnected.call(this);
    }

    public attributeChangedCallback(...args) {
      onAttributeChange.call(this, ...args);
    }

    public disconnectedCallback() {
      onDisconnected.call(this);
    }
  }

  attributes.forEach((name) => {
    Object.defineProperty(CustomElement.prototype, name, {
      get() {
        return this.__properties[name];
      },
      set(v) {
        if (this.__mounted) {
          this.attributeChangedCallback(name, null, v);
        }

        const type = typeof v;
        if (v == null || type === 'string' || type === 'boolean' || type === 'number') {
          this.setAttribute(name, v);
        }
      },
    });
  });

  return CustomElement;
}

/**
 * Defines custom events on an instance of the custom element (the actual element)
 * according to the provided list of event names and makes sure those events are
 * correctly dispatched when the underlying Preact component calls its corresponding
 * event-handler callbacks.
 *
 * This was inspired by Voorhoede's register function here:
 * https://github.com/voorhoede/preact-web-components-demo/blob/main/src/lib/register.js#L158
 */
function proxyEvents(props, eventNames, CustomElement) {
  const callbacks = {};

  (eventNames || []).forEach((name) => {
    // Convert the event name to a kebab-case format and replace 'on' with 'ds'
    // This prevents the custom events from conflicting with the native events
    const customName = kebabCaseIt(name.replace('on', 'ds'));
    let existingCallback = () => null;

    // Don't know why `existingCallback` is being defined
    // Why would a callback already be defined in props?
    if (props && props[name]) {
      existingCallback = props[name].bind({});
    }

    // The callback created here is passed when the custom element's connectedCallback is called
    // Dispatches a custom event when called
    const customCb = (event) => {
      // TODO: We might need to start customizing this function for certain callbacks because
      // not all of our handler functions use an event as the parameter. We might need to
      // allow the caller of the define function to pass custom callbacks for certain events
      // that return the custom event.
      const customEvent = new CustomEvent(customName, {
        ...event,
        composed: true,
        bubbles: true,
        detail: {
          target: event.target,
        },
      });

      CustomElement.dispatchEvent(customEvent);

      existingCallback();
    };

    callbacks[name] = customCb;
  });

  return callbacks;
}

/**
 * Called each time one of these custom elements is added to the document and does all
 * the magic to make the thing work. It gathers the attributes, slots, and event handler
 * functions and packages them up to send to the underlying Preact component as props
 * through a Preact render call.
 *
 * See [Custom element lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks)
 * for more details.
 */
function onConnected(this: CustomElement) {
  const attributes = getElementAttributes.call(this);
  const props = this.getAttribute('props');
  const json = this.querySelector('[type="application/json"]');
  const data = parseJson.call(this, props || json?.innerHTML || '{}');

  const eventHandlers = proxyEvents(this.__properties, this.__options.events, this);

  json?.remove();

  let children = this.__children;

  if (!this.__mounted && !this.hasAttribute('server')) {
    children = parseHtml.call(this);
  }

  this.__properties = { ...this.__slots, ...data, ...attributes, ...eventHandlers };
  this.__children = children || [];

  this.removeAttribute('server');
  this.innerHTML = '';

  const result = this.__componentFunction();
  const renderer = (component: ComponentFactory) => finaliseComponent.call(this, component);

  if (isPromise(result)) {
    getAsyncComponent(result, this.tagName).then(renderer);

    return;
  }

  renderer(result);
}

/* -----------------------------------
 *
 * Finalise
 *
 * -------------------------------- */

function finaliseComponent(this: CustomElement, component: ComponentFactory<IProps>) {
  const { tagName } = this;
  const { wrapComponent } = this.__options;

  if (!component) {
    console.error(ErrorTypes.Missing, `: <${tagName.toLowerCase()}>`);

    return;
  }

  if (wrapComponent) {
    component = wrapComponent(component);
  }

  this.__component = component;
  this.__mounted = true;

  const props = {
    ...this.__properties,
    parent: this,
    children: this.__children,
  };

  render(h(component, props), this);
}

/**
 * Called when attributes are changed, added, removed, or replaced. Gathers up the prop
 * changes and merges them with the previously defined props and uses those props to
 * re-render the underlying Preact component.
 *
 * See [Custom element lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks)
 * for more details.
 */
function onAttributeChange(this: CustomElement, name: string, original: string, updated: string) {
  if (!this.__mounted) {
    return;
  }

  updated = updated == null ? void 0 : updated;

  let props = this.__properties;

  if (name === 'props') {
    props = { ...props, ...parseJson.call(this, updated) };
  } else {
    props[getPropKey(name)] = updated;
  }

  this.__properties = props;

  render(h(this.__component, { ...props, parent: this, children: this.__children }), this);
}

/**
 * Called each time the element is removed from the document.
 */
function onDisconnected(this: CustomElement) {
  render(null, this);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { define };
