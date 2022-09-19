import React, { useContext } from 'react';
import TableContext from './TableContext';
import classNames from 'classnames';

export type TableCellScope = 'row' | 'col' | 'rowgroup' | 'colgroup';
export type TableCellAlign = 'center' | 'left' | 'right';
export type TableCellComponent = 'td' | 'th';

export interface TableCellProps {
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
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName?: string;
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

export const TableCell: React.FC<
  Omit<React.ComponentPropsWithoutRef<'th'>, OmitProps> &
    Omit<React.ComponentPropsWithoutRef<'td'>, OmitProps> &
    TableCellProps
> = ({
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
  const { stackable, warningDisabled } = useContext(TableContext);

  let Component;
  if (component) {
    Component = component;
  } else {
    Component = _isTableHeadChild ? 'th' : 'td';
  }
  if (process.env.NODE_ENV !== 'production' && stackable && !warningDisabled) {
    // Provide warning message for `id` prop for cells with parent component of `TableHead`
    if (_isTableHeadChild) {
      if (!id && children) {
        console.warn(
          'The id prop in `TableCell` is required for stackable tables. This prop is needed to assign an id to a heading in the responsive stacked view.'
        );
      }
    } else if (Component === 'td') {
      // Provide warning message for stacktable `headers` and `stackedTitle` props
      if (!headers) {
        console.warn(
          'The headers prop in `TableCell` is required for stackable tables. This prop is needed to associate the headings with data cells in the responsive stacked view.'
        );
      }
      if (!stackedTitle) {
        console.warn(
          'The stackedTitle prop in `TableCell` is required for stackable tables. This prop is displayed for the data cell in the responsive stacked view.'
        );
      }
    }
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

  const alignClassName = align ? `ds-c-table__cell--align-${align}` : null;
  const classes = classNames(alignClassName, className);

  // The data attributes `data-title` is access by CSS to generates row header content for stacked table
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
