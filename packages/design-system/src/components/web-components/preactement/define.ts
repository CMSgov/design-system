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
import { signal } from '@preact/signals';

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
    __propsSignal;

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

    public renderPreactComponent(addedNodes?: Node[]) {
      renderPreactComponent.call(this, addedNodes);
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
function proxyEvents(props, events: IOptions['events'], CustomElement) {
  const callbacks = {};

  (events || []).forEach((nameOrArray) => {
    const name: string = Array.isArray(nameOrArray) ? nameOrArray[0] : nameOrArray;
    const getEventFromCallbackArgs = Array.isArray(nameOrArray)
      ? nameOrArray[1]
      : (event: CustomEventInit<unknown>) => ({
          ...event,
          detail: { target: (event as UIEvent).target },
        });

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
    const customCb = (...args: any[]) => {
      const event = getEventFromCallbackArgs(...args);
      const customEvent = new CustomEvent(customName, {
        ...event,
        composed: true,
        bubbles: true,
      });

      if ((event as any).preventDefault) {
        customEvent.preventDefault = () => (event as any).preventDefault();
      }

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
    const childListMutations = mutations.filter(
      (mutation: MutationRecord) => mutation.type === 'childList'
    );
    if (childListMutations.length) {
      const addedNodes = childListMutations.reduce(
        (nodes, mutation) => [...nodes, ...mutation.addedNodes],
        []
      );
      this.renderPreactComponent(addedNodes);
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
    props = { ...props, [getPropKey(name)]: updated };
  }

  this.__properties = props;
  // Will trigger a re-render of the `StateWrapper` component if it changed
  this.__propsSignal.value = props;
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

function isEmptyTemplate(template: HTMLTemplateElement): boolean {
  const wrapperSpan = template.content.firstChild;
  return !wrapperSpan || wrapperSpan.childNodes.length === 0;
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
  const children = vnode.props.children[0].props.children;
  if (Array.isArray(children) && children.length === 0) {
    // This means the HTML inside it was empty, so the intention is for there to be no
    // children content for the component. The Preact components will expect `undefined`
    // in those cases.
    return undefined;
  } else {
    return children;
  }
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
function renderPreactComponent(this: CustomElement, addedNodes?: Node[]) {
  if (!this.__component) {
    console.error(ErrorTypes.Missing, `: <${this.tagName.toLowerCase()}>`);
    return;
  }

  // We don't want the mutation observer responding to all the changes we make in this
  // function, or we'll get an endless feedback loop of change and re-render.
  this.__mutationObserver?.disconnect();

  // We use a template to parse our innerHTML and turn it into Preact Virtual DOM (vnode)
  // Putting the original inner content into a template also allows us to keep a copy of
  // it for future renders where context has been lost (see function documentation).
  let template: HTMLTemplateElement | undefined = [...this.childNodes].find(isTemplate);
  if (template && isEmptyTemplate(template)) {
    // Web components rendered with Angular will have no innerHTML content at first, even
    // if content was placed between the tags in the Angular template. In that case when
    // we do our first render pass executing this function, we will generate an empty
    // internal template because it gets filled with non-existent innerHTML. So when we
    // perform a subsequent render, if our previous template is empty, we want to both
    // start over with a new template and remove the old one so it doesn't make its way
    // into the new. Even if the empty template is a false positive for this Angular
    // behavior, there's no harm in replacing it with a new empty template, but there
    // _is_ harm in leaving a non-empty template to duplicate its content by using it in
    // the inner HTML that will go into a new template (which results in buttons inside
    // of buttons and things like that).
    template.remove();
    template = undefined;
  }
  if (!template) {
    template = document.createElement('template');
    if (addedNodes) {
      const span = document.createElement('span');
      span.append(...addedNodes);
      template.content.append(span);
    } else {
      template.innerHTML = wrapTemplateHtml(this.innerHTML);
    }
  }
  const { vnode, slots } = templateToPreactVNode(template);

  // For technical reasons, our vnode needs to be wrapped in an element that didn't exist
  // in the original innerHTML. To keep that from getting passed to the Preact component,
  // we need to unwrap our vnode before we pass it as the `children` prop.
  const children = unwrapTemplateVNode(vnode);

  // If we were to call this function that we're in every time a prop changed, it would
  // clobber the internal state of our underlying Preact component. To avoid this, we're
  // going to tie our attributes (props) to Preact Signals that we can use to trigger
  // re-rendering a `StateWrapper` component.
  const propsSignal = signal(this.__properties);
  this.__propsSignal = propsSignal;
  const StateWrapper = () => h(this.__component, { ...propsSignal.value, ...slots, children });

  // TODO: Clearing everything before the Preact component render only appears to be
  // necessary for the unit tests. I haven't figured out why yet.
  [...this.childNodes].forEach((childNode) => childNode.remove());

  // Render the Preact component to the root of this custom element
  render(h(StateWrapper, {}), this);

  // The Preact render would have removed this template, so add it back in
  this.appendChild(template);

  // Reinstate the mutation observer to watch for user changes
  this.__mutationObserver.observe(this, { childList: true });
}
