import { cloneElement } from 'react';
import type * as React from 'react';

interface BaseTableHeadProps {
  /**
   * The table head contents, usually `TableRow`.
   */
  children?: React.ReactNode;
}

type OmitProps = 'children';

export type TableHeadProps = Omit<React.ComponentPropsWithoutRef<'thead'>, OmitProps> &
  BaseTableHeadProps;

export const TableHead = ({ children, ...tableHeadProps }: TableHeadProps) => {
  const renderChildren = () => {
    const normalizedChildren = Array.isArray(children) ? children : [children];
    return normalizedChildren.map((child: React.ReactElement) => {
      // Extend props before rendering.
      if (child && child.props) {
        return cloneElement(child as React.ReactElement<any>, {
          _isTableHeadChild: true,
        });
      }
      return child;
    });
  };

  return (
    <thead role="rowgroup" {...tableHeadProps}>
      {renderChildren()}
    </thead>
  );
};

export default TableHead;
