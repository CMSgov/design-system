import { cloneElement } from 'react';
import type * as React from 'react';

interface BaseTableRowProps {
  /**
   * The table row contents, usually `TableCell`.
   */
  children?: React.ReactNode;
  /**
   * @ignore This gets set from the parent `TableHead`
   */
  _isTableHeadChild?: boolean;
}

type OmitProps = 'children';

export type TableRowProps = Omit<React.ComponentPropsWithoutRef<'tr'>, OmitProps> &
  BaseTableRowProps;

export const TableRow = ({ children, _isTableHeadChild, ...tableRowProps }: TableRowProps) => {
  const renderChildren = () => {
    const normalizedChildren = Array.isArray(children) ? children : [children];
    return normalizedChildren.map((child: React.ReactElement) => {
      if (child && child.props) {
        return cloneElement(child as React.ReactElement<any>, {
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
