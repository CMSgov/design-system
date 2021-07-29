import PropTypes from 'prop-types';
import React from 'react';

export const TableHead = ({ children, _stackable, ...tableHeadProps }) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      // TODO: Use React Context when all products are on React v16.8 or higher
      if (child && child.props) {
        return React.cloneElement(child, {
          _isTableHeadChild: true,
          _stackable: _stackable,
        });
      }
      return child;
    });
  };

  /* eslint-disable jsx-a11y/no-redundant-roles */
  return (
    <thead role="rowgroup" {...tableHeadProps}>
      {renderChildren()}
    </thead>
  );
  /* eslint-enable jsx-a11y/no-redundant-roles */
};

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
