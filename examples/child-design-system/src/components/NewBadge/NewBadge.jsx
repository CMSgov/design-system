import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const NewBadge = (props) => {
  const { className, children, size, variation, ...others } = props;
  const sizeClasses = { big: 'ds-u-font-size--base' };

  const variationClass = variation && `ds-c-badge--${variation}`;
  const classes = classNames('ds-c-badge', variationClass, sizeClasses[size], className);

  return (
    <span className={classes} {...others}>
      NEW BADGE
    </span>
  );
};

NewBadge.propTypes = {
  /**
   * Aasdfsdfa
   */
  className: PropTypes.string,
  /**
   * Label text or HTML.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Sets the font size of the Badge
   */
  size: PropTypes.oneOf(['big']),
  /**
   * A string corresponding to the badge-component variation classes
   */
  variation: PropTypes.oneOf(['info', 'success', 'warn', 'alert']),
};

export default NewBadge;
