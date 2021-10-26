import * as React from 'react';

export type VerticalNavItemComponent = React.ReactElement<any> | any | ((...args: any[]) => any);

export interface VerticalNavItemProps {
  /**
   * @hide-prop This gets passed through from the parent VerticalNav to a nested VerticalNav
   */
  _selectedId?: string;
  /**
   * Aria label for the toggle button when the sub-navigation is collapsed
   */
  ariaCollapsedStateButtonLabel?: string;
  /**
   * Aria label for the toggle button when the sub-navigation is expanded
   */
  ariaExpandedStateButtonLabel?: string;
  /**
   * Additional classes to be added to the root element
   */
  className?: string;
  /**
   * When provided, this will render the passed in component. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   */
  component?: VerticalNavItemComponent;
  /**
   * Whether or not the item's sub-navigation is in a collapsed state by default
   */
  defaultCollapsed?: boolean;
  /**
   * Called when the link is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `id`, `url`.
   * This takes precedence over the `VerticalNav` `onLinkClick` prop
   */
  onClick?: (...args: any[]) => any;
  /**
   * Called when this item's subnav is collapsed or expanded, with the
   * following arguments: `id`, `collapsed`
   */
  onSubnavToggle?: (...args: any[]) => any;
  /**
   * Optional identifier. This can be handy if you're passing in an
   * `onClick` handler. A unique ID will be generated if one isn't provided.
   */
  id?: string;
  /**
   * An array of nested `VerticalNavItem` data objects to be rendered in a
   * sub-navigation list.
   */
  items?: any[];
  /**
   * Text to render for this nav item
   */
  label: React.ReactNode;
  /**
   * A URL to navigate to if this item is a link
   */
  url?: string;
  /**
   * If this item is currently selected
   */
  selected?: boolean;
}

export default class VerticalNavItem extends React.Component<VerticalNavItemProps, any> {
  render(): JSX.Element;
}
