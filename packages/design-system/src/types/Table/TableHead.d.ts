import * as React from 'react';

export interface TableHeadProps {
  /**
   * The table head contents, usually `TableRow`.
   */
  children?: React.ReactNode;
}

declare const TableHead: React.FC<React.ComponentPropsWithRef<'tbody'> & TableHeadProps>;

export default TableHead;
