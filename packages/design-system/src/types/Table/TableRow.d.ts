import * as React from 'react';

export interface TableRowProps {
  /**
   * The table row contents, usually `TableCell`.
   */
  children?: React.ReactNode;
  /**
   * @hide-prop This gets set from the parent `TableHead`
   */
  _isTableHeadChild?: boolean;
  /**
   * @hide-prop This gets set from the parent `Table`
   */
  _stackable?: boolean;
}

declare const TableRow: React.FC<React.ComponentPropsWithRef<'tr'> & TableRowProps>;

export default TableRow;
