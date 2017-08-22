import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * The `Spinner` component
 */
export const Spinner = (props) => {
  const className = classNames(
    'ds-c-spinner',
    props.size && `ds-c-spinner--${props.size}`,
    props.inverse && 'ds-u-fill--background-inverse ds-u-color--base-inverse',
    props.background && 'ds-c-spinner--background',
    props.className
  );

  return <span className={className} />;
};

Spinner.propTypes = {
  /**
   * Additional classes to be added to the spinner element.
   * Useful for adding utility classes.
   */
  className: PropTypes.string,
  /** Applies the inverse theme styling */
  inverse: PropTypes.bool,
  /** Adds a background behind the spinner for extra contrast */
  background: PropTypes.bool,
  /** Smaller or larger variant */
  size: PropTypes.oneOf(['small', 'big'])
};

export default Spinner;
