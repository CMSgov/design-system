import PropTypes from 'prop-types';
import React from 'react';

export const TableBody = ({ children, _stackable, ...tableBodyProps }) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      // TODO: Use React Context when all products are on React v16.8 or higher
      if (child && child.props) {
        return React.cloneElement(child, {
          _stackable: _stackable,
        });
      }
      return child;
    });
  };

  return <tbody {...tableBodyProps}>{_stackable ? renderChildren() : children}</tbody>;
};

TableBody.propTypes = {
  /**
   * The table body contents, usually `TableRow`.
   */
  children: PropTypes.node,
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _stackable: PropTypes.bool,
};

export default TableBody;
