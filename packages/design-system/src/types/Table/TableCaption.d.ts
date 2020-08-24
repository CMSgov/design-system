import * as React from 'react';

export interface TableCaptionProps {
  /**
   * The table caption contents.
   */
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the caption element.
   */
  className?: string;
  /**
   * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
   */
  _id?: string;
  /**
   * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
   */
  _scrollActive?: boolean;
  /**
   * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
   */
  _scrollableNotice?: React.ReactNode;
}

declare const TableCaption: React.FC<TableCaptionProps>;

export default TableCaption;
