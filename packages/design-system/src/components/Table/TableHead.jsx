import PropTypes from 'prop-types';
import React from 'react';

export const TableHead = ({ children, ...tableHeadProps }) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // Extend props before rendering.
      if (child && child.props) {
        return React.cloneElement(child, {
          _isTableHeadChild: true,
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
};

export default TableHead;
