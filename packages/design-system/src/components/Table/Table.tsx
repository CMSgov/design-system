import { Children, cloneElement, isValidElement } from 'react';
import type * as React from 'react';
import TableCaption from './TableCaption';
import classNames from 'classnames';

/**
 * Determine if a ReactNode is a TableCaption
 */
function isTableCaption(child?: React.ReactNode): child is React.ReactElement {
  if (!child || !isValidElement(child)) {
    return false;
  }

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  const componentName = (child.type as any)?.displayName || (child.type as any)?.name;
  return child.type === TableCaption || componentName === 'TableCaption';
}

export type TableStackableBreakpoint = 'sm' | 'md' | 'lg';

interface BaseTableProps {
  /**
   * Applies the borderless variation of the table.
   */
  borderless?: boolean;
  /**
   * The table contents, usually `TableCaption`, `TableHead` and `TableBody`.
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root table element.
   */
  className?: string;
  /**
   * Applies the compact variation of the table.
   */
  compact?: boolean;
  /**
   * A unique ID prefix for all the table caption elements.
   */
  id?: string;
  /**
   * Applies responsive styles to vertically stacked rows at different viewport sizes.
   */
  stackableBreakpoint?: TableStackableBreakpoint;
  /**
   * A striped variation of the table.
   */
  striped?: boolean;
}

type OmitProps = 'children' | 'className';

export type TableProps = Omit<React.ComponentPropsWithoutRef<'table'>, OmitProps> & BaseTableProps;

/**
 * `Table` is a container component that contains `TableCaption`, `TableHead`
 * and `TableBody` as children, as well as `TableRow` and `TableCell` for the
 * table content. These components mostly follow ordinary HTML table semantics
 * and responsive features rendering tables as vertically stacked rows at
 * specified breakpoints.
 *
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/table/).
 */
export const Table = ({
  borderless,
  className,
  compact,
  stackableBreakpoint,
  striped,
  children,
  id,
  ...tableProps
}: TableProps) => {
  const classes = classNames(
    `ds-c-table ds-c-${stackableBreakpoint}-table--stacked`,
    borderless ? 'ds-c-table--borderless' : null,
    compact ? 'ds-c-table--compact' : null,
    striped ? 'ds-c-table--striped' : null,
    className
  );

  const renderedChildren = Children.map(children, (child: React.ReactElement) => {
    if (isTableCaption(child)) {
      // Extend props on TableCaption before rendering.
      return cloneElement(child);
    }
    return child;
  });

  return (
    <table className={classes} {...tableProps}>
      {renderedChildren}
    </table>
  );
};

Table.defaultProps = {
  stackableBreakpoint: 'sm',
};

export default Table;
