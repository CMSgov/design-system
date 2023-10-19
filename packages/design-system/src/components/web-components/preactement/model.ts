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
  attributes?: string[];
  events?: string[];
  formatProps?: <P = any>(props: P) => P;
  wrapComponent?: <P>(child: ComponentFactory<P>) => ComponentFactory<P>;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IOptions, ComponentFunction, ComponentResult, ComponentAsync };
