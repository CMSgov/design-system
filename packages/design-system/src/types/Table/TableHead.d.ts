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
}

declare const TableHead: React.FC<TableHeadProps>;

export default TableHead;
