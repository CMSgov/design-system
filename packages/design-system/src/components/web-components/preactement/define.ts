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
  child: ComponentFunction<P>,
  options: IOptions = {}
): FunctionComponent<P> {
  const { wrapComponent } = options;
  const preRender = typeof window === 'undefined';
  const elementTag = getElementTag(tagName);

  if (!preRender) {
    customElements.define(elementTag, setupElement(child, options));

    return;
  }

  const content = child();

  if (isPromise(content)) {
    throw new Error(`${ErrorTypes.Promise} : <${tagName}>`);
  }

  let component = content;
  const attributes: Record<string, any> = { server: true };

  if (wrapComponent) {
    component = wrapComponent(content);
  }

  return (props: P) =>
    h(elementTag, attributes, [
      h('script', {
        type: 'application/json',
        dangerouslySetInnerHTML: { __html: JSON.stringify(props) },
      }),
      h(component, props),
    ]);
}

/* -----------------------------------
 *
 * Setup
 *
 * -------------------------------- */

function setupElement<T>(component: ComponentFunction<T>, options: IOptions = {}): any {
  const { attributes = [] } = options;

  if (typeof Reflect !== 'undefined' && Reflect.construct) {
    const CustomElement = function () {
      const element = Reflect.construct(HTMLElement, [], CustomElement);

      element.__mounted = false;
      element.__component = component;
      element.__properties = {};
      element.__slots = {};
      element.__children = void 0;
      element.__options = options;

      return element;
    };

    CustomElement.observedAttributes = ['props', ...attributes];

    CustomElement.prototype = Object.create(HTMLElement.prototype);
    CustomElement.prototype.constructor = CustomElement;
    CustomElement.prototype.connectedCallback = onConnected;
    CustomElement.prototype.attributeChangedCallback = onAttributeChange;
    CustomElement.prototype.disconnectedCallback = onDisconnected;

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

    // This works, but it clobbers pre-existing event handlers made via `addEventListener`
    // events.forEach((name) => {
    //   Object.defineProperty(CustomElement.prototype, name, {
    //     set(v) {
    //       if (this.__mounted) {
    //         this.attributeChangedCallback(name, null, v);
    //       }
    //     },
    //   });
    // });

    return CustomElement;
  }

  return class CustomElement extends HTMLElement {
    __mounted = false;
    __component = component;
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
  };
}

// Using part of Voorhoede's register function to implement custom event handlers
// https://github.com/voorhoede/preact-web-components-demo/blob/main/src/lib/register.js#L158
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

/* -----------------------------------
 *
 * Connected
 *
 * -------------------------------- */

function onConnected(this: CustomElement) {
  const attributes = getElementAttributes.call(this);
  const props = this.getAttribute('props');
  const json = this.querySelector('[type="application/json"]');
  const data = parseJson.call(this, props || json?.innerHTML || '{}');

  const eventHandlers = proxyEvents(this.__properties, this.__options.events, this);

  json?.remove();

  let children = this.__children;

  if (!this.__mounted && !this.hasAttribute('server')) {
    children = h(parseHtml.call(this), {});
  }

  this.__properties = { ...this.__slots, ...data, ...attributes, ...eventHandlers };
  this.__children = children || [];

  this.removeAttribute('server');
  this.innerHTML = '';

  const response = this.__component();
  const renderer = (result: ComponentFactory) => finaliseComponent.call(this, result);

  if (isPromise(response)) {
    getAsyncComponent(response, this.tagName).then(renderer);

    return;
  }

  renderer(response);
}

/* -----------------------------------
 *
 * Attribute
 *
 * -------------------------------- */

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

  render(h(this.__instance, { ...props, parent: this, children: this.__children }), this);
}

/* -----------------------------------
 *
 * Disconnected
 *
 * -------------------------------- */

function onDisconnected(this: CustomElement) {
  render(null, this);
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

  this.__instance = component;
  this.__mounted = true;

  const props = {
    ...this.__properties,
    parent: this,
    children: this.__children,
  };

  render(h(component, props), this);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { define };
