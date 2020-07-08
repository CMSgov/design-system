import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({ children, className, _id, ...others }) => {
  const classes = classNames('ds-c-table__caption', className);
  return (
    <caption className={classes} id={_id} {...others}>
      {children}
    </caption>
  );
};

TableCaption.propTypes = {
  /**
   * The table caption contents.
   */
  children: PropTypes.node,
  /**
   * Additional classes to be added to the caption element.
   */
  className: PropTypes.string,
  /**
   * @hide-prop This gets passed from the parent <Table> component when the horizontal scroll is active.
   */
  _id: PropTypes.string,
};

export default TableCaption;
