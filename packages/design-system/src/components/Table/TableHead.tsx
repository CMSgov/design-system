import { cloneElement } from 'react';
import type * as React from 'react';
import useId from '../utilities/useId';

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
  const childKeyPrefix = useId('table-head-child--');
  const renderChildren = () => {
    const normalizedChildren = Array.isArray(children) ? children : [children];
    return normalizedChildren.map((child: React.ReactElement<any>, index: number) => {
      const key = child?.key ?? `${childKeyPrefix}--${index}`;
      // Extend props before rendering.
      if (child && child.props) {
        return cloneElement(child as React.ReactElement<any>, {
          key,
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
