import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export class VerticalNavItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      expanded: this.props.defaultExpanded
    };
  }

  handleClick(evt) {
    if (this.props.onClick) {
      this.props.onClick(
        evt,
        this.props.id,
        this.props.url
      );
    }
  }

  /**
   * Returns the button for toggling the nested menu's expanded state
   */
  renderToggle() {
    if (this.props.items && this.props.items.length) {
      const label = this.state.expanded
        ? this.props.ariaExpandedStateButtonLabel
        : this.props.ariaCollapsedStateButtonLabel;

      return (
        <button className='ds-c-vertical-nav__subnav-toggle'>
          {label}
        </button>
      );
    }
  }

  render() {
    const classes = classNames('ds-c-vertical-nav__item', this.props.className);
    const LinkComponent = this.props.url ? 'a' : 'div';
    const linkProps = {
      className: classNames(
        'ds-c-vertical-nav__link',
        {'ds-c-vertical-nav__link--current': this.props.selected}
      ),
      href: this.props.url ? this.props.url : undefined,
      onClick: this.props.onClick ? this.handleClick : undefined
    };

    return (
      <li className={classes}>
        <LinkComponent {...linkProps}>
          {this.renderToggle()}
          {this.props.label}
        </LinkComponent>
      </li>
    );
  }
}

VerticalNavItem.defaultProps = {
  ariaCollapsedStateButtonLabel: 'Expand submenu',
  ariaExpandedStateButtonLabel: 'Collapse submenu',
  defaultExpanded: true
};

VerticalNavItem.propTypes = {
  /**
   * Aria label for the toggle button when the submenu is collapsed
   */
  ariaCollapsedStateButtonLabel: PropTypes.string,
  /**
   * Aria label for the toggle button when the submenu is expanded
   */
  ariaExpandedStateButtonLabel: PropTypes.string,
  /**
   * Additional classes to be added to the root element
   */
  className: PropTypes.string,
  /**
   * The initial expanded state for this item's nested menu
   */
  defaultExpanded: PropTypes.bool,
  /**
   * Called when the item is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `id`, `url`
   */
  onClick: PropTypes.func,
  /**
   * Optional identifier. This can be handy if you're passing in an
   * `onClick` handler
   */
  id: PropTypes.string,
  /**
   * Nested nav items
   */
  items: PropTypes.arrayOf(
    PropTypes.shape(VerticalNavItem.propTypes)
  ),
  /**
   * Text to render for this nav item
   */
  label: PropTypes.string.isRequired,
  /**
   * URL to navigate to if this is a link
   */
  url: PropTypes.string,
  /**
   * If this item is currently selected
   */
  selected: PropTypes.bool
};

export default VerticalNavItem;
