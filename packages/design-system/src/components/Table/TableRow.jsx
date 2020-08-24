import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableRow = ({ children, className, ...others }) => {
  const classes = classNames('ds-c-table__row', className);

  return (
    <tr className={classes} role="row" {...others}>
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  /**
   * The table row contents, usually `TableDataCell` and `TableHeaderCell`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the table row element.
   */
  className: PropTypes.string,
};

export default TableRow;
