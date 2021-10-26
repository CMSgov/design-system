import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const Card = (props) => {
  const { className, children, ...others } = props;
  const classes = classNames('ds-c-card', className);

  return (
    <div className={classes} {...others}>
      {children}
    </div>
  );
};

Card.propTypes = {
  /**
   * Additional classNames to add to the card component
   */
  className: PropTypes.string,
  /**
   * Card text or HTML.
   */
  children: PropTypes.node.isRequired,
};

export default Card;
