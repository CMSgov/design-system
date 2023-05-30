import React from 'react';
import VerticalNavItem, { VerticalNavItemProps } from './VerticalNavItem';
import classNames from 'classnames';

export type VerticalNavComponent = React.ReactElement<any> | any | ((...args: any[]) => any);

export interface VerticalNavProps {
  /**
   * An optional arial label for the `<nav>` element in this component.
   * This prop is necessary when there is more than one nav element on a page.
   */
  ariaNavLabel?: string;
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
  onLinkClick?: (evt: React.MouseEvent | React.KeyboardEvent, id: string, url: string) => any;
}

export const VerticalNav = (props: VerticalNavProps): React.ReactElement => {
  const classes = classNames(
    {
      'ds-c-vertical-nav': !props.nested,
      'ds-c-vertical-nav__subnav': props.nested,
      'ds-c-vertical-nav--collapsed': props.collapsed,
    },
    props.className
  );

  const navProps = props.ariaNavLabel ? { 'aria-label': props.ariaNavLabel } : {};

  const navList = (
    <ul role="list" className={classes} id={props.id}>
      {props.items.map((item) => {
        let onClick = item.onClick || props.onLinkClick;
        if (!onClick) {
          onClick = undefined;
        }

        const selected = item.selected || (props.selectedId && props.selectedId === item.id);

        return (
          <VerticalNavItem
            {...item}
            component={props.component || item.component}
            _selectedId={props.selectedId}
            key={item.id + item.url + item.label}
            onClick={onClick}
            selected={selected}
          />
        );
      })}
    </ul>
  );

  return props.nested ? navList : <nav {...navProps}>{navList}</nav>;
};

VerticalNav.defaultProps = {
  collapsed: false,
};

export default VerticalNav;
