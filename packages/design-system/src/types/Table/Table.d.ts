import * as React from 'react';

export type TableStackableBreakpoint = 'sm' | 'md' | 'lg';

export interface TableProps {
  /**
   * The table contents, usually `TableCaption`, `TableHead` and `TableBody`.
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root table element.
   */
  className?: string;
  /**
   * Applies a horizontal scrollbar and scrollable notice on `TableCaption` when the `Table`'s contents exceed the container width.
   */
  scrollable?: boolean;
  /**
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
   * This prop will only be used when the `Table` `scrollable` prop is set and the table width is wider than the viewport.
   */
  scrollableNotice?: React.ReactNode;
  /**
   * A stackable variation of the table.
   * When `stackable` is set, `id` or `headers` prop is required in `TableCell`
   */
  stackable?: boolean;
  /**
   * Applies responsive styles to vertically stacked rows at different viewpoint sizes.
   */
  stackableBreakpoint?: TableStackableBreakpoint;
  /**
   * A striped variation of the table.
   */
  striped?: boolean;
}

declare const Table: React.FC<TableProps>;

export default Table;
