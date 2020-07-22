import Alert from '../Alert/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({
  children,
  className,
  _id,
  _scrollActive,
  scrollableNotice,
  ...others
}) => {
  const classes = classNames('ds-c-table__caption', className);
  return (
    <caption className={classes} id={_id} {...others}>
      {children}
      {_scrollActive && scrollableNotice}
    </caption>
  );
};

TableCaption.defaultProps = {
  scrollableNotice: (
    <Alert
      className="ds-u-margin-y--1 ds-u-font-size--small ds-u-font-weight--normal"
      role="status"
    >
      <p className="ds-c-alert__text">Scroll using arrow keys to see more</p>
    </Alert>
  ),
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
   * @hide-prop This gets passed from the parent `Table` component when the horizontal scroll is active.
   */
  _id: PropTypes.string,
  /**
   * @hide-prop This gets passed from the parent `Table` component when the horizontal scroll is active.
   */
  _scrollActive: PropTypes.bool,
  /**
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
   * This prop will only be used when the `Table` component `scrollable` prop is set and the table width is wider than the viewport.
   */
  scrollableNotice: PropTypes.node,
};

export default TableCaption;
