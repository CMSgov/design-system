import PropTypes from 'prop-types';
import React from 'react';

export const TableBody = ({ children, ...tableBodyProps }) => {
  /* eslint-disable jsx-a11y/no-redundant-roles */
  return (
    <tbody role="rowgroup" {...tableBodyProps}>
      {children}
    </tbody>
  );
  /* eslint-enable jsx-a11y/no-redundant-roles */
};

TableBody.propTypes = {
  /**
   * The table body contents, usually `TableRow`.
   */
  children: PropTypes.node,
};

export default TableBody;
