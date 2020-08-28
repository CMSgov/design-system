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
   * If this prop is not defined, the component renders a `<th>` element
   * when the parent component is `TableHead` or otherwise a `<td>` element.
   */
  component?: TableCellComponent;
  /**
   * Additional classes to be added to the row element.
   */
  className?: string;
  /**
   * `TableCell` must define a `headers` prop for stackable tables with a `<td>` element.
   * The `headers` prop is needed to associate header and data cells for screen readers.
   * `headers` consist of a list of space-separated ids that each correspond to a `<td>` element.
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   */
  headers?: string;
  /**
   * `TableCell` must define an `id` prop for stackable tables with a `<th>` element .
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   * The `id` prop associates header and data cells for screen readers.
   */
  id?: string;
  /**
   * If this prop is not defined, the component sets a scope attribute of `col` when the parent
   * component is `TableHead` or otherwise a scope attribute of `row`.
   */
  scope?: TableCellScope;
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName?: string;
  /**
   * Table data cell's corresponding header title, this stacked title is displayed when a responsive table
   * is vertically stacked.
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

type OmitProps = 'align' | 'headers' | 'id' | 'scope';

// Remove the "OmitProps" definition inside React.HTMLProps<HTMLDivElement>, and use ours instead
declare const TableCell: React.FC<Omit<React.HTMLProps<HTMLDivElement>, OmitProps> & TableCellProps>;

export default TableCell;
