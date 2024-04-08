import type * as React from 'react';
import classNames from 'classnames';

export interface TableCaptionProps {
  /**
   * The table caption contents.
   */
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the caption element.
   */
  className?: string;
}

export const TableCaption = ({ children, className, ...tableCaptionProps }: TableCaptionProps) => {
  const classes = classNames('ds-c-table__caption', className);
  return (
    <caption className={classes} {...tableCaptionProps}>
      {children}
    </caption>
  );
};

// Set component name to make child.type.displayName available to other components (eg. Table)
TableCaption.displayName = 'TableCaption';

export default TableCaption;
