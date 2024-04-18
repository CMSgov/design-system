import { h, render, FunctionComponent } from 'preact';
import {
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
): FunctionComponent<P> | undefined {
  const elementTag = getElementTag(tagName);

  if (typeof window === 'undefined') {
    return createServerSideRenderFunction(elementTag, componentFunction, options);
  } else {
    customElements.define(elementTag, createCustomElement(componentFunction, options));
  }
}

/**
 * Custom elements don't work in server-side-rendering contexts, so return a Preact/React
 * component that can be rendered to the page.
 */
function createServerSideRenderFunction<P = {}>(
  elementTag: string,
  componentFunction: ComponentFunction<P>,
  options: IOptions = {}
): FunctionComponent<P> {
  let component = componentFunction();

  if (isPromise(component)) {
    throw new Error(`${ErrorTypes.Promise} : <${elementTag}>`);
  }

  const { wrapComponent } = options;
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

  class TheCustomElement extends HTMLElement implements CustomElement {
    __mounted = false;
    __componentFunction = componentFunction;
    __component;
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

    public renderPreactComponent() {
      renderPreactComponent.call(this);
    }
  }

  attributes.forEach((name) => {
    Object.defineProperty(TheCustomElement.prototype, name, {
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

  return TheCustomElement;
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
async function onConnected(this: CustomElement) {
  const attributes = getElementAttributes.call(this);
  const propsAttribute = this.getAttribute('props');
  const json = this.querySelector('[type="application/json"]');
  const data = parseJson.call(this, propsAttribute || json?.innerHTML || '{}');

  const eventHandlers = proxyEvents(this.__properties, this.__options.events, this);

  // Remove the json script tag from the DOM after we've used it
  json?.remove();

  let children = this.__children;

  if (!this.__mounted && !this.hasAttribute('server')) {
    children = parseHtml.call(this);
  }

  // Save these properties for use in subsequent renders
  this.__properties = { ...this.__slots, ...data, ...attributes, ...eventHandlers };
  this.__children = children || [];

  let component = this.__componentFunction();
  if (isPromise(component)) {
    component = await getAsyncComponent(component, this.tagName);
  }

  if (!component) {
    console.error(ErrorTypes.Missing, `: <${this.tagName.toLowerCase()}>`);
    return;
  }

  const { wrapComponent } = this.__options;
  if (wrapComponent) {
    component = wrapComponent(component);
  }

  this.__component = component;
  this.__mounted = true;
  this.innerHTML = '';
  this.removeAttribute('server');
  this.renderPreactComponent();
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

  this.renderPreactComponent();
}

/**
 * Called each time the element is removed from the document.
 */
function onDisconnected(this: CustomElement) {
  render(null, this);
}

/**
 * Render the Preact component to this element, using props derived from the current
 * value of `this.__properties` and `this.__children`.
 */
function renderPreactComponent(this: CustomElement) {
  if (!this.__component) {
    console.error(ErrorTypes.Missing, `: <${this.tagName.toLowerCase()}>`);
    return;
  }

  const props = {
    ...this.__properties,
    parent: this,
    children: this.__children,
  };

  render(h(this.__component, props), this);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { define };
