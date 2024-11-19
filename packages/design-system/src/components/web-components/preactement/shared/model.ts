import { Signal } from '@preact/signals';

/* -----------------------------------
 *
 * Component
 *
 * -------------------------------- */

type IComponent = any;

/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

interface IOptions<F = any, W = any> {
  attributes?: readonly string[];
  /**
   * For simple events whose React-prop counterparts are callback functions that pass a
   * simple event object, the name of the React prop will suffice to configure the
   * mapping between React prop and custom event. However, not all of our React
   * components pass just an event to their callback props. Some don't pass an event at
   * all or need to convey additional information, like a page number or selected item.
   * In those special cases, you can supply a name and a function that will take the
   * React callback parameters and return an event-like object that will be used to
   * create the custom event.
   */
  events?: Array<string | readonly [string, (...args: any[]) => CustomEventInit<unknown>]>;
  formatProps?: (props: any) => F;
  wrapComponent?: (child: any) => W;
  shadow?: boolean;
}

/* -----------------------------------
 *
 * Errors
 *
 * -------------------------------- */

enum ErrorTypes {
  Promise = 'Error: Promises cannot be used for SSR',
  Missing = 'Error: Cannot find component in provided function',
  Json = 'Error: Invalid JSON string passed to component',
  Tag = 'Error: Invalid tag name for custom element. Must include a `-`',
}

/* -----------------------------------
 *
 * Element
 *
 * -------------------------------- */

interface CustomElement<CF = any, C = any> extends HTMLElement {
  __mounted: boolean;
  __componentFunction: CF;
  __component?: C;
  __properties?: IProps;
  __events?: IProps;
  __options: IOptions;
  __mutationObserver?: MutationObserver;
  __propsSignal: Signal;
  __root: Element | ShadowRoot;

  forceRender(addedNodes?: Node[]): void;
}

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  [index: string]: any;
}

/* -----------------------------------
 *
 * Guards
 *
 * -------------------------------- */

const isPromise = (input: any): input is Promise<any> => {
  return input && typeof input.then === 'function';
};

/* -----------------------------------
 *
 * Self Closing
 *
 * -------------------------------- */

const selfClosingTags = [
  'area',
  'base',
  'br',
  'col',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'embed',
  'param',
  'track',
  'wbr',
];

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IComponent, IOptions, IProps, ErrorTypes, CustomElement, isPromise, selfClosingTags };
