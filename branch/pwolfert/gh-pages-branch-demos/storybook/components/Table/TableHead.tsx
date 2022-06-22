import React from 'react';

export interface TableHeadProps {
  /**
   * The table head contents, usually `TableRow`.
   */
  children?: React.ReactNode;
}

type OmitProps = 'children';

export const TableHead: React.FC<
  Omit<React.ComponentPropsWithoutRef<'thead'>, OmitProps> & TableHeadProps
> = ({ children, ...tableHeadProps }: TableHeadProps) => {
  const renderChildren = () => {
    return React.Children.map(children, (child: React.ReactElement) => {
      // Extend props before rendering.
      if (child && child.props) {
        return React.cloneElement(child, {
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
