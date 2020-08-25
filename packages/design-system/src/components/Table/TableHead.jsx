import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableHead = ({ children, className, _isTableStackable, ...others }) => {
  const classes = classNames('ds-c-table__head', className);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      if (child) {
        return React.cloneElement(child, {
          _isHeadCell: true,
          _isTableStackable: _isTableStackable,
        });
      }
      return child;
    });
  };

  return (
    <thead className={classes} {...others}>
      {renderChildren()}
    </thead>
  );
};

TableHead.defaultProps = {
  _isTableStackable: null,
};

TableHead.propTypes = {
  /**
   * The table head contents, usually `TableRow`.
   */
  children: PropTypes.node,
  /**
   * Additional classes to be added to the table head element.
   */
  className: PropTypes.string,
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _isTableStackable: PropTypes.bool,
};

export default TableHead;
