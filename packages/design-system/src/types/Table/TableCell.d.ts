import * as React from 'react';

export type TableCellScope = 'row' | 'col' | 'rowgroup' | 'colgroup';
export type TableCellAlign = 'center' | 'left' | 'right';
export type TableCellComponent = 'td' | 'th';

export interface TableCellProps {
  /**
   * Set the text-align on the table cell content.
   */
  align?: TableCellAlign;
  /**
   * The table cell contents.
   */
  children?: React.ReactNode;
  /**
   * When provided, this will render the passed in component as the HTML element.
   * If this prop is undefined, it renders a `<th>` element if the parent component is `TableHead`,
   * otherwise, it renders a `<td>` element.
   */
  component?: TableCellComponent;
  /**
   * Additional classes to be added to the row element.
   */
  className?: string;
  /**
   * `TableCell` must define a `headers` prop for stackable tables with a `<td>` element.
   * The `headers` prop associates header and data cells for screen readers.
   * `headers` consist of a list of space-separated ids that each correspond to a `<td>` element.
   * [Read more about the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   */
  headers?: string;
  /**
   * `TableCell` must define an `id` prop for stackable tables with a `<th>` element.
   * The `id` prop associates header and data cells for screen readers.
   */
  id?: string;
  /**
   * If this prop is undefined, the component sets a scope attribute of `col` when the parent
   * component is `TableHead` to identify the header cell is a header for a column.
   */
  scope?: TableCellScope;
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName?: string;
  /**
   * Table data cell's corresponding header title, this stacked title is displayed as the row header
   * when a responsive table is vertically stacked.
   */
  stackedTitle?: string;
  /**
   * @hide-prop This gets set from the parent `TableHead` component
   */
  _isTableHeadChild?: boolean;
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _stackable?: boolean;
}

declare const TableCell: React.FC<
  React.ComponentPropsWithRef<'th'> &
  React.ComponentPropsWithRef<'td'> &
  TableCellProps
>;

export default TableCell;
