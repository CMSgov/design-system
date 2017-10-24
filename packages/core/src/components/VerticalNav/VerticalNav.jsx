import PropTypes from 'prop-types';
import React from 'react';
import VerticalNavItem from './VerticalNavItem';
import classNames from 'classnames';

/**
 * A `VerticalNav` component accepts list items as a JSON object and
 * includes additional functionality like collapsible nested menus.
 */
export class VerticalNav extends React.PureComponent {
  renderItems() {
    return this.props.items.map(item => {
      let onClick = item.onClick || this.props.onLinkClick;
      const selected =
        item.selected ||
        (this.props.selectedId && this.props.selectedId === item.id);

      if (!onClick) {
        onClick = undefined;
      }

      return (
        <VerticalNavItem
          {...item}
          _selectedId={this.props.selectedId}
          key={item.id + item.url + item.label}
          onClick={onClick}
          selected={selected}
        />
      );
    });
  }

  render() {
    const classes = classNames(
      {
        'ds-c-vertical-nav': !this.props.nested,
        'ds-c-vertical-nav__subnav': this.props.nested,
        'ds-u-display--none': this.props.collapsed
      },
      this.props.className
    );

    return (
      <ul className={classes} id={this.props.id}>
        {this.renderItems()}
      </ul>
    );
  }
}

VerticalNav.defaultProps = {
  collapsed: false
};

VerticalNav.propTypes = {
  /**
   * Additional classes to be added to the root element
   */
  className: PropTypes.string,
  /**
   * Whether or not the menu is in a collapsed state
   */
  collapsed: PropTypes.bool,
  /**
   * The `id` of the selected `VerticalNavItem`. This will also set the
   * `selected` prop on the item's parents.
   */
  selectedId: PropTypes.string,
  id: PropTypes.string,
  /**
   * An array of `VerticalNavItem` data objects
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Indicates this list is nested within another nav item.
   */
  nested: PropTypes.bool,
  /**
   * Called when one of the nav links is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `id`, `url`
   */
  onLinkClick: PropTypes.func
};

export default VerticalNav;
