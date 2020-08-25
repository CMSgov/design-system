import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableRow = ({ children, className, _isHeadCell, _isTableStackable, ...others }) => {
  const classes = classNames('ds-c-table__row', className);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      if (child) {
        return React.cloneElement(child, {
          _isHeadCell: _isHeadCell,
          _isTableStackable: _isTableStackable,
        });
      }
      return child;
    });
  };

  return (
    <tr className={classes} role="row" {...others}>
      {_isHeadCell || _isTableStackable ? renderChildren() : children}
    </tr>
  );
};

TableRow.defaultProps = {
  _isHeadCell: null,
  _isTableStackable: null,
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
  /**
   * @hide-prop This gets set from the parent `TableHead` component
   */
  _isHeadCell: PropTypes.bool,
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _isTableStackable: PropTypes.bool,
};

export default TableRow;
