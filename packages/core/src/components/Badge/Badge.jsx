import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const Badge = props => {
  const { className, children, size, variation, ...others } = props;
  const sizeClasses = { big: 'ds-u-font-size--base' };

  const variationClass = variation && `ds-c-badge--${variation}`;
  const classes = classNames('ds-c-badge', variationClass, sizeClasses[size], className);

  return (
    <span className={classes} {...others}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  /**
   * Additional classes to be added to the root badge element.
   * Useful for adding utility classes.
   */
  className: PropTypes.string,
  /**
   * In most cases this will be the badge's label, but you could also use this
   * to nest more advanced JSX.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  /**
   * Sets the font size of the Badge
   */
  size: PropTypes.oneOf(['big']),
  /**
   * A string corresponding to the badge-component variation classes
   */
  variation: PropTypes.oneOf(['info', 'success', 'warn', 'alert'])
};

export default Badge;
