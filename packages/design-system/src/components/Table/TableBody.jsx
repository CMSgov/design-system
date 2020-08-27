import PropTypes from 'prop-types';
import React from 'react';

export const TableBody = ({ children, _stackable, ...others }) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      if (child) {
        return React.cloneElement(child, {
          _stackable: _stackable,
        });
      }
      return child;
    });
  };

  return <tbody {...others}>{_stackable ? renderChildren() : children}</tbody>;
};

// TableBody.defaultProps = {
//   _stackable: false,
// };

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
