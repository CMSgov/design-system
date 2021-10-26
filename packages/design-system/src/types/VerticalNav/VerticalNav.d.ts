import * as React from 'react';
import { VerticalNavItemProps } from './VerticalNavItem';

export type VerticalNavComponent = React.ReactElement<any> | any | ((...args: any[]) => any);

export interface VerticalNavProps {
  /**
   * Additional classes to be added to the root element
   */
  className?: string;
  /**
   * Whether or not the menu is in a collapsed state
   */
  collapsed?: boolean;
  /**
   * When provided, this will render the passed in component for all `VerticalNavItem`s. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   * If more specific control is needed, each `VerticalNavItem` object also accepts a `component` prop.
   */
  component?: VerticalNavComponent;
  /**
   * The `id` of the selected `VerticalNavItem`. This will also set the
   * `selected` prop on the item's parents.
   */
  selectedId?: string;
  id?: string;
  /**
   * An array of [`VerticalNavItem`]({{root}}/components/vertical-nav/#components.vertical-nav.VerticalNavItem) data objects
   */
  items: VerticalNavItemProps[];
  /**
   * Indicates this list is nested within another nav item.
   */
  nested?: boolean;
  /**
   * Called when one of the nav links is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `id`, `url`
   */
  onLinkClick?: (...args: any[]) => any;
}

export default class VerticalNav extends React.Component<VerticalNavProps, any> {
  render(): JSX.Element;
}
