import PropTypes from 'prop-types';
import React from 'react';

export const TableRow = ({ children, _isTableHeadChild, ...tableRowProps }) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      if (child && child.props) {
        return React.cloneElement(child, {
          _isTableHeadChild: _isTableHeadChild,
        });
      }
      return child;
    });
  };

  return (
    <tr role="row" {...tableRowProps}>
      {_isTableHeadChild ? renderChildren() : children}
    </tr>
  );
};

TableRow.propTypes = {
  /**
   * The table row contents, usually `TableCell`.
   */
  children: PropTypes.node,
  /**
   * @hide-prop This gets set from the parent `TableHead` component
   */
  _isTableHeadChild: PropTypes.bool,
};

export default TableRow;
