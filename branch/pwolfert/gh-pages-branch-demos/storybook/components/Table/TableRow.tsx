import React from 'react';

export interface TableRowProps {
  /**
   * The table row contents, usually `TableCell`.
   */
  children?: React.ReactNode;
  /**
   * @hide-prop This gets set from the parent `TableHead`
   */
  _isTableHeadChild?: boolean;
}

type OmitProps = 'children';

export const TableRow: React.FC<
  Omit<React.ComponentPropsWithoutRef<'tr'>, OmitProps> & TableRowProps
> = ({ children, _isTableHeadChild, ...tableRowProps }: TableRowProps) => {
  const renderChildren = () => {
    return React.Children.map(children, (child: React.ReactElement) => {
      // Extend props before rendering.
      if (child && child.props) {
        return React.cloneElement(child, {
          _isTableHeadChild: _isTableHeadChild,
        });
      }
      return child;
    });
  };

  return (
    <tr role="row" {...tableRowProps}>
      {_isTableHeadChild ? renderChildren() : children}
    </tr>
  );
};

export default TableRow;
