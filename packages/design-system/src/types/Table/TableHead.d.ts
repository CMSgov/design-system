import * as React from 'react';

export interface TableHeadProps {
  /**
   * The table head contents, usually `TableRow`.
   */
  children?: React.ReactNode;
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _stackable?: boolean;
}

declare const TableHead: React.FC<React.ComponentPropsWithRef<'tbody'> & TableHeadProps>;

export default TableHead;
