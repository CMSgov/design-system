import type * as React from 'react';
import classNames from 'classnames';

export type TableCellScope = 'row' | 'col' | 'rowgroup' | 'colgroup';
export type TableCellAlign = 'center' | 'left' | 'right';
export type TableCellComponent = 'td' | 'th';

interface BaseTableCellProps {
  /**
   * Set the text-align on the table cell content. Options: left, center, right.
   */
  align?: TableCellAlign;
  /**
   * The table cell contents.
   */
  children?: React.ReactNode;
  /**
   * When provided, this will render the passed in component as the HTML element.
   * If this prop is undefined, it renders a `<th>` element if the parent component is `TableHead`,
   * otherwise, it renders a `<td>` element.
   */
  component?: TableCellComponent;
  /**
   * Additional classes to be added to the row element.
   */
  className?: string;
  /**
   * `TableCell` must define a `headers` prop for stackable tables with a `<td>` element.
   * The `headers` prop associates header and data cells for screen readers.
   * `headers` consist of a list of space-separated ids that each correspond to a `<td>` element.
   * [Read more about the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   */
  headers?: string;
  /**
   * `TableCell` must define an `id` prop for stackable tables with a `<th>` element.
   * The `id` prop associates header and data cells for screen readers.
   */
  id?: string;
  /**
   * If this prop is undefined, the component sets a scope attribute of `col` when the parent
   * component is `TableHead` to identify the header cell is a header for a column.
   */
  scope?: TableCellScope;
  /**
   * Table data cell's corresponding header title, this stacked title is displayed as the row header
   * when a responsive table is vertically stacked.
   */
  stackedTitle?: string;
  /**
   * @hide-prop This gets set from the parent `TableHead` component
   */
  _isTableHeadChild?: boolean;
}

type OmitProps = 'align' | 'children' | 'className' | 'headers' | 'id' | 'scope';

export type TableCellProps = Omit<React.ComponentPropsWithoutRef<'th'>, OmitProps> &
  Omit<React.ComponentPropsWithoutRef<'td'>, OmitProps> &
  BaseTableCellProps;

/**
 * `TableCell` dynamically renders a `<th>` or `<td>` element based on the
 * parent component or user specified `component` prop. By default `TableCell`
 * will automatically render a `<th>` element if the parent component is
 * `TableHead`, otherwise it will render a `<td>` element.
 */
export const TableCell = ({
  align,
  children,
  className,
  component,
  headers,
  id,
  scope,
  stackedTitle,
  _isTableHeadChild,
  ...tableCellProps
}: TableCellProps) => {
  let Component;
  if (component) {
    Component = component;
  } else {
    Component = _isTableHeadChild ? 'th' : 'td';
  }

  let role = 'cell';
  if (_isTableHeadChild) {
    role = 'columnheader';
  } else if (component === 'th') {
    role = 'rowheader';
  }

  let defaultScope = scope;
  if (!defaultScope && _isTableHeadChild) {
    defaultScope = 'col';
  }

  const alignClassName = align ? `ds-u-text-align--${align}` : null;
  const classes = classNames(alignClassName, className);

  // The data attributes `data-title` is accessed by CSS to generate row header content for stacked table
  return (
    <Component
      className={classes}
      role={role}
      scope={defaultScope}
      headers={headers}
      id={id}
      data-title={stackedTitle}
      {...tableCellProps}
    >
      {children}
    </Component>
  );
};

TableCell.defaultProps = {
  align: 'left',
};

export default TableCell;
