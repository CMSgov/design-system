import PropTypes from 'prop-types';
import React from 'react';

export const TableHead = ({ children, _stackable, ...others }) => {
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

  return <thead {...others}>{renderChildren()}</thead>;
};

// TableHead.defaultProps = {
//   _stackable: false,
// };

TableHead.propTypes = {
  /**
   * The table head contents, usually `TableRow`.
   */
  children: PropTypes.node,
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _stackable: PropTypes.bool,
};

export default TableHead;
