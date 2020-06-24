import Alert from '../Alert/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({
  children,
  className,
  _scrollActive,
  scrollCaption,
  ...tableCaptionProps
}) => {
  const classes = classNames('ds-c-table__caption', className);
  return (
    <caption className={classes} {...tableCaptionProps}>
      {children}
      {_scrollActive && scrollCaption}
    </caption>
  );
};

TableCaption.defaultProps = {
  scrollCaption: (
    <Alert className="ds-u-margin-y--1 ds-u-font-size--small ds-u-font-weight--normal">
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
   * @hide-prop This gets passed through from the parent Table - Horizontal scroll is active.
   */
  _scrollActive: PropTypes.bool,
  /**
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
   * This prop will only be used when the table width is wider than the viewport.
   */
  scrollCaption: PropTypes.node,
};

export default TableCaption;
