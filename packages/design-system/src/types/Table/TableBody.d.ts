import * as React from 'react';

export interface TableBodyProps {
  /**
   * The table body contents, usually `TableRow`.
   */
  children?: React.ReactNode;
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _stackable?: boolean;
}

declare const TableBody: React.FC<React.ComponentPropsWithRef<'tbody'> & TableBodyProps>;

export default TableBody;
