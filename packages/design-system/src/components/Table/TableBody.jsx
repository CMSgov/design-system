import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableBody = ({ children, className, _isTableStackable, ...others }) => {
  const classes = classNames('ds-c-table__body', className);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      if (child) {
        return React.cloneElement(child, {
          _isTableStackable: _isTableStackable,
        });
      }
      return child;
    });
  };

  return (
    <tbody className={classes} {...others}>
      {_isTableStackable ? renderChildren() : children}
    </tbody>
  );
};

TableBody.defaultProps = {
  _isTableStackable: null,
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
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _isTableStackable: PropTypes.bool,
};

export default TableBody;
