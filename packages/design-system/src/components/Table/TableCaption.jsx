import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({ tableCaption, children, className, ...attributeOptions }) => {
  const classes = classNames('ds-c-table__caption', className);

  return (
    <caption className={classes} {...attributeOptions}>
      {tableCaption}
      {children}
    </caption>
  );
};

TableCaption.defaultProps = {
  className: '',
};

TableCaption.propTypes = {
  /**
   * The table caption content.
   */
  children: PropTypes.node,
  /**
   * Title of the table caption.
   */
  tableCaption: PropTypes.string,
  /**
   * Additional classes to be added to the caption element.
   */
  className: PropTypes.string,
};

export default TableCaption;
