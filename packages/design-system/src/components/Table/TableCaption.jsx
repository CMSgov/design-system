import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({ tableCaption, className, ...attributeOptions }) => {
  const classes = classNames('ds-c-table__caption', className);

  return (
    <caption className={classes} {...attributeOptions}>
      {tableCaption}
    </caption>
  );
};

TableCaption.defaultProps = {
  className: '',
};

TableCaption.propTypes = {
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
