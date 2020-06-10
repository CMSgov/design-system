import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({ children, className, ...attributeOptions }) => {
  const classes = classNames('ds-c-table__caption', className);

  return (
    <caption className={classes} {...attributeOptions}>
      {children}
    </caption>
  );
};

TableCaption.defaultProps = {
  className: '',
};

TableCaption.propTypes = {
  /**
   * The table caption contents.
   */
  children: PropTypes.node,
  /**
   * Additional classes to be added to the caption element.
   */
  className: PropTypes.string,
};

export default TableCaption;
