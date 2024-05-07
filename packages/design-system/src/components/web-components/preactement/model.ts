import { ComponentFactory } from 'preact';

/* -----------------------------------
 *
 * Types
 *
 * -------------------------------- */

type ComponentFunction<P = {}> = () => ComponentResult<P>;
type ComponentResult<P = {}> = ComponentFactory<P> | ComponentAsync<P>;
type ComponentAsync<P = {}> =
  | Promise<ComponentFactory<P>>
  | Promise<{ [index: string]: ComponentFactory<P> }>;

/* -----------------------------------
 *
 * IOptions
 *
 * -------------------------------- */

interface IOptions {
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
  events?: Array<string | [string, (...args: any[]) => CustomEventInit<unknown>]>;
  formatProps?: <P = any>(props: P) => P;
  wrapComponent?: <P>(child: ComponentFactory<P>) => ComponentFactory<P>;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IOptions, ComponentFunction, ComponentResult, ComponentAsync };
