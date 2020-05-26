import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableBody = ({ children, className, ...attributeOptions }) => {
  const classes = classNames('ds-c-table__body', className);

  return (
    <tbody className={classes} {...attributeOptions}>
      {children}
    </tbody>
  );
};

TableBody.defaultProps = {
  className: '',
};

TableBody.propTypes = {
  /**
   * The table body content.
   */
  children: PropTypes.node,
  /**
   * Additional classes to be added to the table body element.
   */
  className: PropTypes.string,
};

export default TableBody;
