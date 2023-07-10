import React from 'react';
export interface TableBodyProps {
  /**
   * The table body contents, usually `TableRow`.
   */
  children?: React.ReactNode;
}

type OmitProps = 'children';

/**
 * `TableBody` renders the `<tbody>` element and will typically contain `TableRow` elements to define table data.
 */
export const TableBody: React.FC<
  Omit<React.ComponentPropsWithoutRef<'tbody'>, OmitProps> & TableBodyProps
> = ({ children, ...tableBodyProps }: TableBodyProps) => {
  return (
    <tbody role="rowgroup" {...tableBodyProps}>
      {children}
    </tbody>
  );
};

export default TableBody;
