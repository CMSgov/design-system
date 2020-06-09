import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({
  tableCaption,
  children,
  className,
  scrollable,
  scrollableCaption,
  ...attributeOptions
}) => {
  const classes = classNames('ds-c-table__caption', className);

  return (
    <caption className={classes} {...attributeOptions}>
      {tableCaption}
      {scrollable && scrollableCaption}
      {children}
    </caption>
  );
};

TableCaption.defaultProps = {
  className: '',
  scrollableCaption: <small>Scroll using arrow keys to see more</small>,
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
   * Table is scrollable.
   */
  scrollable: PropTypes.bool,
  /**
   * Additional scrollable text/node to display
   */
  scrollableCaption: PropTypes.node,
  /**
   * Title of the table caption.
   */
  tableCaption: PropTypes.node,
};

export default TableCaption;
