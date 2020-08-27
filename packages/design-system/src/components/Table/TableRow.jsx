import PropTypes from 'prop-types';
import React from 'react';

export const TableRow = ({ children, _isTableHeadChild, _stackable, ...others }) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      if (child) {
        return React.cloneElement(child, {
          _isTableHeadChild: _isTableHeadChild,
          _stackable: _stackable,
        });
      }
      return child;
    });
  };

  return (
    <tr role="row" {...others}>
      {_isTableHeadChild || _stackable ? renderChildren() : children}
    </tr>
  );
};

// TableRow.defaultProps = {
//   _isTableHeadChild: false,
//   _stackable: false,
// };

TableRow.propTypes = {
  /**
   * The table row contents, usually `TableCell`.
   */
  children: PropTypes.node.isRequired,
  /**
   * @hide-prop This gets set from the parent `TableHead` component
   */
  _isTableHeadChild: PropTypes.bool,
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _stackable: PropTypes.bool,
};

export default TableRow;
