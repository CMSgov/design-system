import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export class VerticalNavItemLabel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.LabelComponent = this.componentType();
  }

  /**
   * The type of element rendered ultimately depends on whether
   * this is meant to be a subnav toggle, link, or generic label
   * @return {String} The type of HTML tag
   */
  componentType() {
    if (this.props.hasSubnav) {
      return 'button';
    } else if (this.props.url) {
      return 'a';
    }

    return 'div';
  }

  handleClick(evt) {
    this.props.onClick(evt);
  }

  anchorProps() {
    return {
      href: this.props.url
    };
  }

  buttonProps() {
    return {
      'aria-controls': this.props.subnavId,
      'aria-expanded': !this.props.collapsed,
      title: this.props.collapsed
        ? this.props.ariaCollapsedStateButtonLabel
        : this.props.ariaExpandedStateButtonLabel
    };
  }

  render() {
    let props = {
      className: classNames('ds-c-vertical-nav__label', {
        'ds-c-vertical-nav__label--current': this.props.selected,
        'ds-c-vertical-nav__label--parent': this.props.hasSubnav
      }),
      onClick: this.props.onClick ? this.handleClick : undefined
    };

    if (this.LabelComponent === 'a') {
      props = Object.assign(props, this.anchorProps());
    } else if (this.LabelComponent === 'button') {
      props = Object.assign(props, this.buttonProps());
    }

    return (
      <this.LabelComponent {...props}>{this.props.label}</this.LabelComponent>
    );
  }
}

VerticalNavItemLabel.defaultProps = {
  ariaCollapsedStateButtonLabel: 'Expand sub-navigation',
  ariaExpandedStateButtonLabel: 'Collapse sub-navigation'
};

VerticalNavItemLabel.propTypes = {
  ariaCollapsedStateButtonLabel: PropTypes.string,
  ariaExpandedStateButtonLabel: PropTypes.string,
  collapsed: PropTypes.bool,
  hasSubnav: PropTypes.bool,
  label: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  subnavId: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default VerticalNavItemLabel;
