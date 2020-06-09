import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableHead = ({ children, className }) => {
  const classes = classNames('ds-c-table__head', className);

  return <thead className={classes}>{children}</thead>;
};

TableHead.defaultProps = {
  className: '',
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
};

export default TableHead;
