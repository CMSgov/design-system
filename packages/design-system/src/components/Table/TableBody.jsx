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

TableBody.propTypes = {
  /**
   * The table body contents, usually `TableRow`.
   */
  children: PropTypes.node,
  /**
   * Additional classes to be added to the table body element.
   */
  className: PropTypes.string,
};

export default TableBody;
