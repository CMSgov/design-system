import PropTypes from 'prop-types';
import React from 'react';
import VerticalNavItem from './VerticalNavItem';
import classNames from 'classnames';

export class VerticalNav extends React.PureComponent {
  renderItems() {
    return this.props.items.map(item => {
      let onClick = item.onClick || this.props.onLinkClick;
      if (!onClick) {
        onClick = undefined;
      }

      const selected =
        item.selected || (this.props.selectedId && this.props.selectedId === item.id);

      return (
        <VerticalNavItem
          {...item}
          component={this.props.component || item.component}
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
   * When provided, this will render the passed in component for all `VerticalNavItem`s. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   * If more specific control is needed, each `VerticalNavItem` object also accepts a `component` prop.
   */
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.func]),
  /**
   * The `id` of the selected `VerticalNavItem`. This will also set the
   * `selected` prop on the item's parents.
   */
  selectedId: PropTypes.string,
  id: PropTypes.string,
  /**
   * An array of `VerticalNavItem` data objects
   */
  items: PropTypes.arrayOf(PropTypes.shape(PropTypes.object)).isRequired,
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
