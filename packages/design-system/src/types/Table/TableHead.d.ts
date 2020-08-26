import * as React from 'react';

export interface TableHeadProps {
  /**
   * The table head contents, usually `TableRow`.
   */
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the table head element.
   */
  className?: string;
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _stackable?: boolean;
}

declare const TableHead: React.FC<TableHeadProps>;

export default TableHead;
