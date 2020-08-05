import { Button as CoreButton } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * Wrapper component for adding an additional variation to the core Button
 */
export const Button = (props) => {
  if (props.variation === 'custom') {
    props.variation = 'primary';
    props.className = classNames(props.className, `ds-c-button--custom`);
  }

  return <CoreButton {...props} />;
};

/**
 * Button prop documentation with the additional "custom" variation
 */
Button.defaultProps = {};
Button.propTypes = {
  /**
   * Label text or HTML
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Additional classes to be added to the root button element.
   * Useful for adding utility classes.
   */
  className: PropTypes.string,
  /**
   * When provided, this will render the passed in component. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   */
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.func]),
  disabled: PropTypes.bool,
  /**
   * When provided the root component will render as an `<a>` element
   * rather than `button`.
   */
  href: PropTypes.string,
  /**
   * Access a reference to the `button` or `a` element
   */
  inputRef: PropTypes.func,
  /** @hide-prop [Deprecated] Use inversed instead */
  inverse: PropTypes.bool,
  /** Applies the inverse theme styling */
  inversed: PropTypes.bool,
  /**
   * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
   * Not called when the button is disabled.
   */
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'big']),
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
   */
  type: PropTypes.oneOf(['button', 'submit']),
  /**
   * A string corresponding to the button-component variation classes
   */
  variation: PropTypes.oneOf(['primary', 'danger', 'success', 'transparent', 'custom']),
};

export default Button;
