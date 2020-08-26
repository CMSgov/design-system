import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableRow = ({ children, className, _isTableHeadChild, _stackable, ...others }) => {
  const classes = classNames('ds-c-table__row', className);

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
    <tr className={classes} role="row" {...others}>
      {_isTableHeadChild || _stackable ? renderChildren() : children}
    </tr>
  );
};

TableRow.defaultProps = {
  _isTableHeadChild: false,
  _stackable: false,
};

TableRow.propTypes = {
  /**
   * The table row contents, usually `TableCell`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the table row element.
   */
  className: PropTypes.string,
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
