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

  /* eslint-disable jsx-a11y/no-redundant-roles */
  return (
    <thead role="rowgroup" {...tableHeadProps}>
      {renderChildren()}
    </thead>
  );
  /* eslint-enable jsx-a11y/no-redundant-roles */
};

export default TableHead;
