import React from 'react';
import classNames from 'classnames';

/**
 * The Button component behaves similarly to a normal HTML button element, in
 * that it accepts its text as inner HTML.
 */
const Button = ({ className, inverse, modifier, onClick, size, ...props }) => {
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
    !disabledClassName && modifierClassName,
    size && `ds-c-button--${size}`,
    className
  );

  if (props.disabled) {
    onClick = null;
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      {...props}
    >
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
  /** Returns the SyntheticEvent. Not called when the button is disabled. */
  onClick: React.PropTypes.func,
  size: React.PropTypes.oneOf(['small', 'big']),
  /** HTML button type attribute */
  type: React.PropTypes.oneOf(['button', 'submit'])
};

export default Button;
