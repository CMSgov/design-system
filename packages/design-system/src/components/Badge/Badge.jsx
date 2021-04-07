import ClearIcon from './ClearIcon';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export class Badge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      badgeDismissed: false,
    };
  }

  handleClick(evt) {
    if (this.props.onClick) {
      this.props.onClick(evt);
    }

    if (this.props.dismissible) {
      this.setState({ badgeDismissed: true });
    }
  }

  render() {
    const { className, children, size, variation, dismissible, clearIcon, ...others } = this.props;
    const sizeClasses = { big: 'ds-u-font-size--base' };

    const variationClass = variation && `ds-c-badge--${variation}`;
    const dismissibleClass = dismissible && 'ds-c-badge--dismissible';
    const classes = classNames(
      'ds-c-badge',
      variationClass,
      sizeClasses[size],
      dismissibleClass,
      className
    );

    const BadgeComponent = dismissible ? 'button' : 'span';

    return (
      <>
        {!this.state.badgeDismissed && (
          <>
            <BadgeComponent className={classes} onClick={this.handleClick} {...others}>
              {children}
              {dismissible && (
                <span className="ds-c-badge-icon__container ">
                  {clearIcon ? <>{clearIcon}</> : <ClearIcon className="ds-c-badge-icon" />}
                </span>
              )}
            </BadgeComponent>
          </>
        )}
      </>
    );
  }
}

Badge.propTypes = {
  /**
   * Additional classes to be added to the root badge element.
   * Useful for adding utility classes.
   */
  className: PropTypes.string,
  /**
   * When provided with the dismissible prop, will use a custom icon instead of default icon
   */
  clearIcon: PropTypes.node,
  /**
   * Label text or HTML.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Whether badge should be dismissible
   */
  dismissible: PropTypes.bool,
  /**
   * Function called onClick
   */
  onClick: PropTypes.func,
  /**
   * Sets the font size of the Badge
   */
  size: PropTypes.oneOf(['big']),
  /**
   * A string corresponding to the badge-component variation classes
   */
  variation: PropTypes.oneOf(['info', 'success', 'warn', 'alert']),
};

export default Badge;
