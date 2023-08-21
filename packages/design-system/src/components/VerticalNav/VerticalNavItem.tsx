import React from 'react';
import { useState } from 'react';
import VerticalNav from './VerticalNav';
import VerticalNavItemLabel from './VerticalNavItemLabel';
import classNames from 'classnames';
import useId from '../utilities/useId';

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
  onClick?: (evt: React.MouseEvent | React.KeyboardEvent, id: string, url: string) => any;
  /**
   * Called when this item's subnav is collapsed or expanded, with the
   * following arguments: `id`, `collapsed`
   */
  onSubnavToggle?: (id: string, collapsed: boolean) => any;
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

export const VerticalNavItem = (props: VerticalNavItemProps): React.ReactElement => {
  const rootId = useId('vertical-nav-item--', props.id);
  const subnavId = `${rootId}__subnav`;
  const iconId = `${rootId}__icon`;

  const [collapsed, setCollapsed] = useState(props.defaultCollapsed);

  /**
   * Note: This event handler will only get called when the VerticalNavItemLabel
   * is a link or plain text
   */
  const handleClick = (evt: React.MouseEvent | React.KeyboardEvent): void => {
    if (props.onClick) {
      props.onClick(evt, rootId, props.url);
    }
  };

  const handleToggleClick = (): void => {
    setCollapsed(!collapsed);

    if (props.onSubnavToggle) {
      props.onSubnavToggle(rootId, collapsed);
    }
  };

  const hasSubnav = (): boolean => Boolean(props.items && props.items.length > 0);

  /**
   * Called when VerticalNavItemLabel is clicked. Since the "label" could be
   * a link, subnav toggle button, or plain text, we use this method to
   * determine what action to take and which event to actually fire.
   * @param {Object} SyntheticEvent
   */
  const handleLabelClick = (evt: React.MouseEvent | React.KeyboardEvent): void => {
    if (hasSubnav()) {
      return handleToggleClick();
    }

    return handleClick(evt);
  };

  /**
   * Checks if a descendant is selected
   * @param {Array} children - The nested items
   * @return {Boolean}
   */
  const childIsSelected = (children): boolean => {
    if (children && children.length) {
      return children.some((child: any) => {
        return child.id === props._selectedId || childIsSelected(child.items);
      });
    }

    return false;
  };

  /**
   * Check if this item is selected or if it is a parent of a selected item
   * @return {Boolean}
   */
  const isSelected = (): boolean => {
    if (props.selected) return props.selected;

    if (props._selectedId && hasSubnav()) {
      return childIsSelected(props.items);
    }

    return false;
  };

  const subnavItems = (): any => {
    if (props.url) {
      // Since the VerticalNavItemLabel will just toggle the subnav, we
      // add a link to the top of the subnav for this item. Otherwise there
      // wouldn't be a way to actually visit its URL
      const item = Object.assign({}, props);
      delete item.items;

      return [item].concat(props.items);
    }

    return props.items;
  };

  const classes = classNames('ds-c-vertical-nav__item', props.className);

  return (
    <li className={classes}>
      <VerticalNavItemLabel
        ariaCollapsedStateButtonLabel={props.ariaCollapsedStateButtonLabel}
        ariaExpandedStateButtonLabel={props.ariaExpandedStateButtonLabel}
        collapsed={collapsed}
        component={props.component}
        label={props.label}
        hasSubnav={hasSubnav()}
        onClick={handleLabelClick}
        selected={isSelected()}
        subnavId={subnavId}
        url={props.url}
        iconId={iconId}
      />
      {hasSubnav() && (
        <VerticalNav
          selectedId={props._selectedId}
          collapsed={collapsed}
          id={subnavId}
          items={subnavItems()}
          component={props.component}
          nested
        />
      )}
    </li>
  );
};

VerticalNavItem.defaultProps = {
  // Unfortunately, we're defining these default ARIA props here and in
  // VerticalNavItemLabel. We define them here so they show in the docs.
  // TODO(sawyer): Update react-docgen so we don't have to do this
  ariaCollapsedStateButtonLabel: 'Expand sub-navigation',
  ariaExpandedStateButtonLabel: 'Collapse sub-navigation',
  defaultCollapsed: false,
};

export default VerticalNavItem;
