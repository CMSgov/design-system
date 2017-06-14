import PropTypes from 'prop-types';
import React from 'react';
import VerticalNav from './VerticalNav';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class VerticalNavItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.id = this.props.id || uniqueId('VerticalNavItem_');
    this.subnavId = `${this.id}__subnav`;
    this.state = {
      expanded: this.props.defaultExpanded
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onSubnavToggle && prevState.expanded !== this.state.expanded) {
      this.props.onSubnavToggle(this.props.id, this.state.expanded);
    }
  }

  handleLinkClick(evt) {
    if (this.props.onClick) {
      this.props.onClick(
        evt,
        this.id,
        this.props.url
      );
    }
  }

  handleToggleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  hasSubnav() {
    return this.props.items && this.props.items.length;
  }

  renderSubnavToggle() {
    if (this.hasSubnav()) {
      const label = this.state.expanded
        ? this.props.ariaExpandedStateButtonLabel
        : this.props.ariaCollapsedStateButtonLabel;

      return (
        <button
          aria-controls={this.subnavId}
          aria-expanded={this.state.expanded}
          className='ds-c-vertical-nav__subnav-toggle'
          onClick={this.handleToggleClick}
        >
          {label}
        </button>
      );
    }
  }

  renderSubnav() {
    if (this.hasSubnav()) {
      return (
        <VerticalNav
          expanded={this.state.expanded}
          id={this.subnavId}
          items={this.props.items}
          nested
        />
      );
    }
  }

  render() {
    const classes = classNames('ds-c-vertical-nav__item', this.props.className);
    const LinkComponent = this.props.url ? 'a' : 'div';
    const linkProps = {
      className: classNames(
        'ds-c-vertical-nav__link',
        {
          'ds-c-vertical-nav__link--current': this.props.selected,
          'ds-c-vertical-nav__link--parent': this.hasSubnav()
        }
      ),
      href: this.props.url ? this.props.url : undefined,
      onClick: this.props.onClick ? this.handleLinkClick : undefined
    };

    return (
      <li className={classes}>
        <LinkComponent {...linkProps}>
          {this.props.label}
        </LinkComponent>
        {this.renderSubnavToggle()}
        {this.renderSubnav()}
      </li>
    );
  }
}

VerticalNavItem.defaultProps = {
  ariaCollapsedStateButtonLabel: 'Expand sub-navigation',
  ariaExpandedStateButtonLabel: 'Collapse sub-navigation',
  defaultExpanded: true
};

VerticalNavItem.propTypes = {
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
   * Whether or not the item's sub-navigation is in an expanded state by default
   */
  defaultExpanded: PropTypes.bool,
  /**
   * Called when the item is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `id`, `url`.
   *
   * This takes precedence over the `VerticalNav` `onLinkClick` prop
   */
  onClick: PropTypes.func,
  /**
   * Called when this item's subnav is collapsed or expanded, with the
   * following arguments: `id`, `expanded`
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
  items: PropTypes.arrayOf(
    PropTypes.shape(VerticalNavItem.propTypes)
  ),
  /**
   * Text to render for this nav item
   */
  label: PropTypes.string.isRequired,
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
