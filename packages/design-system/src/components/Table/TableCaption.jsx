import Alert from '../Alert/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCaption = ({
  children,
  className,
  scrollActive,
  scrollCaption,
  ...tableCaptionProps
}) => {
  const classes = classNames('ds-c-table__caption', className);

  return (
    <caption className={classes} {...tableCaptionProps}>
      {children}
      {scrollActive && scrollCaption}
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
   * Horizontal scroll is active.
   */
  scrollActive: PropTypes.bool,
  /**
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
   * This prop will only be used when the `scrollActive` prop is also set.
   */
  scrollCaption: PropTypes.node,
};

export default TableCaption;
