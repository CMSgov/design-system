import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({ children, className, scrollableAlert, ...attributeOptions }) => {
  const classes = classNames('ds-c-table__caption', className);

  return (
    <caption className={classes} {...attributeOptions}>
      {children}
      {scrollableAlert}
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
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
   */
  scrollableAlert: PropTypes.node,
};

export default TableCaption;
