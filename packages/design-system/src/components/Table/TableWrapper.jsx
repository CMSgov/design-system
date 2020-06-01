import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableWrapper = ({ children, className, ...attributeOptions }) => {
  const classes = classNames('ds-c-table__wrapper', className);

  return (
    <div className={classes} {...attributeOptions}>
      {children}
    </div>
  );
};

TableWrapper.defaultProps = {
  className: '',
};

TableWrapper.propTypes = {
  /**
   * The table wrapper content.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the table wrapper element.
   */
  className: PropTypes.string,
};

export default TableWrapper;
