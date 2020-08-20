import * as React from 'react';

export interface TableDataCellProps {
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the table cell element.
   */
  className?: string;
  /**
   * `TableDataCell` must define a `headers` prop for stackable tables.
   * The `headers` prop is needed to associate header and data cells for screen readers.
   * `headers` consist of a list of space-separated ids that each correspond to a TableHeaderCell element.
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   */
  headers?: string;
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName?: string;
  /**
   * This stacked title is displayed when a responsive table is vertically stacked.
   */
  stackedTitle?: string;
}

declare const TableDataCell: React.FC<TableDataCellProps>;

export default TableDataCell;
