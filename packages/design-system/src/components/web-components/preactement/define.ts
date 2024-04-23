import { h, render, FunctionComponent, VNode } from 'preact';
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
import { templateToPreactVNode } from './parse';
import { IOptions, ComponentFunction } from './model';
import { kebabCaseIt } from 'case-it/kebab';

/**
 * Registers the provided Preact component as a custom element in the browser. It can
 * also generate a custom element with props ready for hydration if run on the server.
 *
 * @param tagName - a valid custom element name (must include at least one hyphen)
 * @param componentFunction - Function that returns the Preact component factory used to
 * render this custom element to the DOM. Can be async for dynamic imports. For example,
 * a valid value could be `() => Alert`, where `Alert` is a Preact component.
 * @param options - additional information used to create the custom component out of a
 * Preact component. (See type definition for details.)
 *
 * @returns undefined or an SSR component (if executed in a non-browser environment)
 */
export function define<P = {}>(
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
    __options = options;
    __mutationObserver;

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
 * Creates a mutation observer that watches for additions and removals to the child
 * nodes at the root of the custom element and calls the render function when it
 * detects changes. This allows users to set the inner HTML and expect the component
 * to update. For instance, a user can take a `<ds-button>` that is already in the
 * DOM and update its content with code like the following:
 *
 *   button.innerHTML = '<ds-spinner></ds-spinner> Loading'.
 *
 * And the button will re-render itself so that its subtree resembles this (simplified):
 *
 *   <ds-button>
 *     <button><ds-spinner></ds-spinner> Loading</button>
 *   </ds-button>
 */
function setupMutationObserver(this: CustomElement) {
  this.__mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
    if (mutations.find((mutation: MutationRecord) => mutation.type === 'childList')) {
      this.renderPreactComponent();
    }
  });
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

  // Save these properties for use in subsequent renders
  this.__properties = { ...data, ...attributes, ...eventHandlers };

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

  setupMutationObserver.call(this);

  this.__component = component;
  this.removeAttribute('server');
  this.renderPreactComponent();
  this.__mounted = true;
}

/**
 * Called when attributes are changed, added, removed, or replaced. Gathers up the prop
 * changes and merges them with the previously defined props and uses those props to
 * re-render the underlying Preact component.
 *
 * See [Custom element lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks)
 * for more details.
 */
function onAttributeChange(this: CustomElement, name: string, _original: string, updated: string) {
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
  this.__mutationObserver?.disconnect();
}

function isTemplate(childNode: ChildNode): childNode is HTMLTemplateElement {
  return childNode.nodeName.toLowerCase() === 'template';
}

/**
 * Because bare text content in the root of a template element doesn't get parsed into
 * its document fragment by the browser, we need to wrap our input content in an element
 * when we create it. We will then need to unwrap it when we're ready to render that
 * content with Preact (see `unwrapTemplateVNode` function).
 */
function wrapTemplateHtml(html: string) {
  return `<span>${html}</span>`;
}

/**
 * See `wrapTemplateHtml` function.
 */
function unwrapTemplateVNode(vnode: VNode): VNode {
  return vnode.props.children[0].props.children;
}

/**
 * Render the Preact component to this element, using props derived from the current
 * value of `this.__properties` and input HTML. After it has rendered once, we have to
 * avoid using the rendered output as the input of any subsequent renders. Since we
 * cannot guarantee that it will be re-rendered by the existing CustomElement instance
 * in browser memory (because a re-render by a parent can destroy this), we must cache
 * the original input in the DOM itself in the form of a `<template>` element. The
 * `<template>` element also gives us the added bonus of parsing our HTML automatically
 * and making it available to use to convert directly into Preact's VNode format. If we
 * were to try to use the rendered Preact output as input for subsequent renders, we
 * would get nested, duplicated elements, like so:
 *
 * <ds-button>
 *   <button>
 *     <button>Hello</button>
 *   <button>
 * </ds-button>
 *
 * Users can also replace the content by setting the innerHTML to something new, and
 * we'll just treat it as new input if we don't find the cached template element!
 */
function renderPreactComponent(this: CustomElement) {
  if (!this.__component) {
    console.error(ErrorTypes.Missing, `: <${this.tagName.toLowerCase()}>`);
    return;
  }

  // We don't want the mutation observer responding to all the changes we make in this
  // function, or we'll get an endless feedback loop of change and re-render.
  this.__mutationObserver?.disconnect();

  let template: HTMLTemplateElement | undefined = [...this.childNodes].find(isTemplate);
  if (!template) {
    template = document.createElement('template');
    template.innerHTML = wrapTemplateHtml(this.innerHTML);
  }

  const { vnode, slots } = templateToPreactVNode(template);

  const children = unwrapTemplateVNode(vnode);

  // These are the props we'll pass to the Preact component
  const props = {
    ...this.__properties,
    parent: this,
    children,
    ...slots,
  };

  // TODO: Clearing everything before the Preact component render only appears to be
  // necessary for the unit tests. I haven't figured out why yet.
  [...this.childNodes].forEach((childNode) => childNode.remove());

  // Render the Preact component to the root of this custom element
  render(h(this.__component, props), this);

  // The Preact render would have removed this template, so add it back in
  this.appendChild(template);

  // Reinstate the mutation observer to watch for user changes
  this.__mutationObserver.observe(this, { childList: true });
}
