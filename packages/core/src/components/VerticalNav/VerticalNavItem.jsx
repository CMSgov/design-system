import PropTypes from 'prop-types';
import React from 'react';
import VerticalNav from './VerticalNav';
import VerticalNavItemLabel from './VerticalNavItemLabel';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class VerticalNavItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.id = this.props.id || uniqueId('VerticalNavItem_');
    this.subnavId = `${this.id}__subnav`;
    this.state = { collapsed: this.props.defaultCollapsed };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.onSubnavToggle &&
      prevState.collapsed !== this.state.collapsed
    ) {
      this.props.onSubnavToggle(this.props.id, this.state.collapsed);
    }
  }

  /**
   * Called when VerticalNavItemLabel is clicked. Since the "label" could be
   * a link, subnav toggle button, or plain text, we use this method to
   * determine what action to take and which event to actually fire.
   * @param {Object} SyntheticEvent
   */
  handleLabelClick(evt) {
    if (this.hasSubnav()) {
      return this.handleToggleClick();
    }

    return this.handleClick(evt);
  }

  /**
   * Note: This event handler will only get called when the VerticalNavItemLabel
   * is a link or plain text
   */
  handleClick(evt) {
    if (this.props.onClick) {
      this.props.onClick(evt, this.id, this.props.url);
    }
  }

  handleToggleClick() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  hasSubnav() {
    return Boolean(this.props.items && this.props.items.length > 0);
  }

  /**
   * Check if this item is selected or if it is a parent of a selected item
   * @return {Boolean}
   */
  isSelected() {
    if (this.props.selected) return this.props.selected;

    if (this.props._selectedId && this.hasSubnav()) {
      return this.childIsSelected(this.props.items);
    }

    return false;
  }

  /**
   * Checks if a descendant is selected
   * @param {Array} children - The nested items
   * @return {Boolean}
   */
  childIsSelected(children) {
    if (children && children.length) {
      return children.some(child => {
        return (
          child.id === this.props._selectedId ||
          this.childIsSelected(child.items)
        );
      });
    }

    return false;
  }

  subnavItems() {
    if (this.props.url) {
      // Since the VerticalNavItemLabel will just toggle the subnav, we
      // add a link to the top of the subnav for this item. Otherwise there
      // wouldn't be a way to actually visit its URL
      const item = Object.assign({}, this.props);
      delete item.items;

      return [item].concat(this.props.items);
    }

    return this.props.items;
  }

  renderSubnav() {
    if (this.hasSubnav()) {
      return (
        <VerticalNav
          selectedId={this.props._selectedId}
          collapsed={this.state.collapsed}
          id={this.subnavId}
          items={this.subnavItems()}
          nested
        />
      );
    }
  }

  render() {
    const classes = classNames('ds-c-vertical-nav__item', this.props.className);

    return (
      <li className={classes}>
        <VerticalNavItemLabel
          ariaCollapsedStateButtonLabel={
            this.props.ariaCollapsedStateButtonLabel
          }
          ariaExpandedStateButtonLabel={this.props.ariaExpandedStateButtonLabel}
          collapsed={this.state.collapsed}
          label={this.props.label}
          hasSubnav={this.hasSubnav()}
          onClick={this.handleLabelClick}
          selected={this.isSelected()}
          subnavId={this.subnavId}
          url={this.props.url}
        />
        {this.renderSubnav()}
      </li>
    );
  }
}

VerticalNavItem.defaultProps = {
  // Unfortunately, we're defining these default ARIA pros here and in
  // VerticalNavItemLabel. We define them here so they show in the docs.
  // TODO(sawyer): Update react-docgen so we don't have to do this
  ariaCollapsedStateButtonLabel: 'Expand sub-navigation',
  ariaExpandedStateButtonLabel: 'Collapse sub-navigation',
  defaultCollapsed: false
};

VerticalNavItem.propTypes = {
  // This gets passed through from the parent VerticalNav to a nested VerticalNav
  _selectedId: PropTypes.string,
  /**
   * Aria label for the toggle button when the sub-navigation is collapsed
   */
  ariaCollapsedStateButtonLabel: PropTypes.string,
  /**
   * Aria label for the toggle button when the sub-navigation is expanded
   */
  ariaExpandedStateButtonLabel: PropTypes.string,
  /**
   * Additional classes to be added to the root element
   */
  className: PropTypes.string,
  /**
   * Whether or not the item's sub-navigation is in a collapsed state by default
   */
  defaultCollapsed: PropTypes.bool,
  /**
   * Called when the link is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `id`, `url`.
   *
   * This takes precedence over the `VerticalNav` `onLinkClick` prop
   */
  onClick: PropTypes.func,
  /**
   * Called when this item's subnav is collapsed or expanded, with the
   * following arguments: `id`, `collapsed`
   */
  onSubnavToggle: PropTypes.func,
  /**
   * Optional identifier. This can be handy if you're passing in an
   * `onClick` handler. A unique ID will be generated if one isn't provided.
   */
  id: PropTypes.string,
  /**
   * An array of nested `VerticalNavItem` data objects to be rendered in a
   * sub-navigation list.
   */
  items: PropTypes.arrayOf(PropTypes.shape(VerticalNavItem.propTypes)),
  /**
   * Text to render for this nav item
   */
  label: PropTypes.node.isRequired,
  /**
   * A URL to navigate to if this item is a link
   */
  url: PropTypes.string,
  /**
   * If this item is currently selected
   */
  selected: PropTypes.bool
};

export default VerticalNavItem;
