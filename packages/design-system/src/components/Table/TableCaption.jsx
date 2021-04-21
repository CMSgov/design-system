import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({
  children,
  className,
  _id,
  _scrollActive,
  _scrollableNotice,
  ...tableCaptionProps
}) => {
  const classes = classNames('ds-c-table__caption', className);
  return (
    <caption className={classes} id={_id} {...tableCaptionProps}>
      {children}
      {_scrollActive && _scrollableNotice}
    </caption>
  );
};

// Set component name to make child.type.displayName available to other components (eg. Table)
TableCaption.displayName = 'TableCaption';

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
   * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
   */
  _id: PropTypes.string,
  /**
   * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
   */
  _scrollActive: PropTypes.bool,
  /**
   * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
   */
  _scrollableNotice: PropTypes.node,
};

export default TableCaption;
