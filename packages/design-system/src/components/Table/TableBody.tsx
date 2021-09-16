import React from 'react';

export interface TableBodyProps {
  /**
   * The table body contents, usually `TableRow`.
   */
  children?: React.ReactNode;
}

type OmitProps = 'children';

export const TableBody: React.FC<
  Omit<React.ComponentPropsWithoutRef<'tbody'>, OmitProps> & TableBodyProps
> = ({ children, ...tableBodyProps }: TableBodyProps) => {
  /* eslint-disable jsx-a11y/no-redundant-roles */
  return (
    <tbody role="rowgroup" {...tableBodyProps}>
      {children}
    </tbody>
  );
  /* eslint-enable jsx-a11y/no-redundant-roles */
};

export default TableBody;
