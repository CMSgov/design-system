import * as React from 'react';

export type TableHeaderCellScope = 'row' | 'col' | 'rowgroup' | 'colgroup';

export interface TableHeaderCellProps {
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the row element.
   */
  className?: string;
  /**
   * Define a `headers` prop for stackable tables with row header cells.
   * This prop has the same function as the `headers` prop on `TableDataCell` component.
   */
  headers?: string;
  /**
   * `TableHeaderCells` must define an `id` prop for stackable tables.
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   * The `id` prop associates header and data cells for screen readers.
   */
  id?: string;
  /**
   * Scope of the header, use 'row' or 'col' for simple tables.
   */
  scope?: TableHeaderCellScope;
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName?: string;
  /**
   * Table Data cells that is a header, this stacked title is displayed when a responsive table is vertically stacked.
   */
  stackedTitle?: string;
}

declare const TableHeaderCell: React.FC<TableHeaderCellProps>;

export default TableHeaderCell;
