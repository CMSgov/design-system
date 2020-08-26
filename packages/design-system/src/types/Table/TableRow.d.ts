import * as React from 'react';

export interface TableRowProps {
  /**
   * The table row contents, usually `TableDataCell` and `TableHeaderCell`.
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the table row element.
   */
  className?: string;
  /**
   * @hide-prop This gets set from the parent `TableHead`
   */
  _isTableHeadChild?: boolean;
  /**
   * @hide-prop This gets set from the parent `Table`
   */
  _stackable?: boolean;
}

declare const TableRow: React.FC<TableRowProps>;

export default TableRow;
