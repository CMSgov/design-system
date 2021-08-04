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
      // TODO: Use React Context when all products are on React v16.8 or higher
      if (child && child.props) {
        return React.cloneElement(child, {
          _isTableHeadChild: true,
          _stackable: _stackable,
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
