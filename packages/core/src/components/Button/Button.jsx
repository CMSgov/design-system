import React from 'react';
import classNames from 'classnames';

/**
 * The Button component behaves similarly to a normal HTML button element, in
 * that it accepts its text as inner HTML.
 */
const Button = ({ className, inverse, modifier, size, ...props }) => {
  let modifierClassName = modifier && `ds-c-button--${modifier}`;
  let disabledClassName = props.disabled && 'ds-c-button--disabled';

  if (inverse) {
    if (disabledClassName) {
      disabledClassName += '-inverse';
    } else if (modifierClassName) {
      modifierClassName += '-inverse';
    } else {
      modifierClassName = 'ds-c-button--inverse';
    }
  }

  const classes = classNames(
    'ds-c-button',
    disabledClassName,
    !props.disabled && modifierClassName,
    size && `ds-c-button--${size}`,
    className
  );

  return (
    <button className={classes} {...props}>
      {props.children}
    </button>
  );
};

Button.displayName = 'Button';

Button.defaultProps = {
  type: 'button'
};

Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string
  ]),
  /**
   * Additional classes to be added to the button element. Useful for adding
   * utility classes.
   */
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  /** Apply the inverse theme styling */
  inverse: React.PropTypes.bool,
  modifier: React.PropTypes.oneOf([
    'primary',
    'danger',
    'success',
    'transparent',
    'disabled'
  ]),
  size: React.PropTypes.oneOf(['small', 'big']),
  /** HTML button type attribute */
  type: React.PropTypes.oneOf(['button', 'submit'])
};

export default Button;
