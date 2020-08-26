import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableHead = ({ children, className, _stackable, ...others }) => {
  const classes = classNames('ds-c-table__head', className);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      if (child) {
        return React.cloneElement(child, {
          _isTableHeadChild: true,
          _stackable: _stackable,
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
  _stackable: false,
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
  _stackable: PropTypes.bool,
};

export default TableHead;
