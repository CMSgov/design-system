import React from 'react';

interface BaseTableBodyProps {
  /**
   * The table body contents, usually `TableRow`.
   */
  children?: React.ReactNode;
}

type OmitProps = 'children';

export type TableBodyProps = Omit<React.ComponentPropsWithoutRef<'tbody'>, OmitProps> &
  BaseTableBodyProps;

/**
 * `TableBody` renders the `<tbody>` element and will typically contain `TableRow` elements to define table data.
 */
export const TableBody = ({ children, ...tableBodyProps }: TableBodyProps) => {
  return (
    <tbody role="rowgroup" {...tableBodyProps}>
      {children}
    </tbody>
  );
};

export default TableBody;
