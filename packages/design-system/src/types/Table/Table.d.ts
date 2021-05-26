import * as React from 'react';

export type TableStackableBreakpoint = 'sm' | 'md' | 'lg';

export interface TableProps {
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
  compact?: boolean,
  /**
   * @hide-prop [Deprecated] Use compact instead.
   */
  dense?: boolean,
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
   * When `stackable` is set, `id` or `headers` prop is required in `Table`
   */
  stackable?: boolean;
  /**
   * Applies responsive styles to vertically stacked rows at different viewport sizes.
   */
  stackableBreakpoint?: TableStackableBreakpoint;
  /**
   * A striped variation of the table.
   */
  striped?: boolean;
}

export default class Table extends React.Component<
  React.ComponentPropsWithRef<'table'> & TableProps,
  any
> {
  render(): JSX.Element;
}
