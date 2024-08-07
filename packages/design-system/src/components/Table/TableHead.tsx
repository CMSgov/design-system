import { Children, cloneElement } from 'react';
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
    return Children.map(children, (child: React.ReactElement) => {
      // Extend props before rendering.
      if (child && child.props) {
        return cloneElement(child, {
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
