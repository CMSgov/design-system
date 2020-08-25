import * as React from 'react';

export type TableCellScope = 'row' | 'col' | 'rowgroup' | 'colgroup';
export type TableCellAlign = 'center' | 'left' | 'right';
export type TableCellTableTag = 'td' | 'th';

export interface TableCellProps {
  /**
   * Set the text-align on the table cell content.
   */
  align?: TableCellAlign;
  /**
   * The table cell contents.
   */
  children?: PropTypes.node;
  /**
   * Additional classes to be added to the row element.
   */
  className?: PropTypes.string;
  /**
   * `TableCell` must define a `headers` prop for stackable tables with a `<td>` element.
   * The `headers` prop is needed to associate header and data cells for screen readers.
   * `headers` consist of a list of space-separated ids that each correspond to a TableHeaderCell element.
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   */
  headers?: PropTypes.string;
  /**
   * `TableCell` must define an `id` prop for stackable tables with a `<th>` element .
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   * The `id` prop associates header and data cells for screen readers.
   */
  id?: PropTypes.string;
  /**
   * If this prop is not defined, the component sets a scope attribute of `col` when the parent
   * component is `TableHead` or otherwise a scope attribute of `row`.
   */
  scope?: TableCellScope;
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName?: PropTypes.string;
  /**
   * Table Data cells that is a header, this stacked title is displayed when a responsive table is vertically stacked.
   */
  stackedTitle?: PropTypes.string;
  /**
   * If this prop is not defined, the component renders a `<th>` element
   * when the parent component is `TableHead` or otherwise a `<td>` element.
   */
  tableTag?: TableCellTableTag;
  /**
   * @hide-prop This gets set from the parent `TableHead` component
   */
  _isHeadCell?: PropTypes.bool;
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _isTableStackable?: PropTypes.bool;
}

declare const TableCell: React.FC<TableCellProps>;

export default TableCell;
