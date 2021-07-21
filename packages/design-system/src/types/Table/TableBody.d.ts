import * as React from 'react';

export interface TableBodyProps {
  /**
   * The table body contents, usually `TableRow`.
   */
  children?: React.ReactNode;
}

declare const TableBody: React.FC<React.ComponentPropsWithRef<'tbody'> & TableBodyProps>;

export default TableBody;
