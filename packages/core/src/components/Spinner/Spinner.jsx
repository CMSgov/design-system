import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const Spinner = props => {
  const className = classNames(
    'ds-c-spinner',
    props.size && `ds-c-spinner--${props.size}`,
    props.inversed && 'ds-u-fill--background-inverse ds-u-color--base-inverse',
    props.filled && 'ds-c-spinner--filled',
    props.className
  );

  return (
    <span
      className={className}
      aria-valuetext={props['aria-valuetext']}
      role={props.role}
    />
  );
};

Spinner.propTypes = {
  /** The text announced to screen readers */
  'aria-valuetext': PropTypes.string,
  /**
   * Additional classes to be added to the spinner element.
   * Useful for adding utility classes.
   */
  className: PropTypes.string,
  /** Applies the inverse theme styling */
  inversed: PropTypes.bool,
  /** Adds a background behind the spinner for extra contrast */
  filled: PropTypes.bool,
  /** Landmark role so the spinner can receive keyboard focus */
  role: PropTypes.string,
  /** Smaller or larger variant */
  size: PropTypes.oneOf(['small', 'big'])
};

Spinner.defaultProps = {
  'aria-valuetext': 'Loading',
  role: 'progressbar'
};

export default Spinner;
