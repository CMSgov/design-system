import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCell = ({
  align,
  children,
  className,
  component,
  headers,
  id,
  scope,
  stackedTitle,
  stackedClassName,
  _isTableHeadChild,
  _stackable,
  ...tableCellProps
}) => {
  if (process.env.NODE_ENV !== 'production' && _stackable) {
    // Provide warning message for `id` prop for cells with parent component of `TableHead`
    if (_isTableHeadChild) {
      if (!id) {
        console.warn(
          'The id prop in `TableCell` is required for stackable tables. This prop is needed to assign an id to a heading in the responsive stacked view.'
        );
      }
    } else {
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

TableCell.propTypes = {
  /**
   * Set the text-align on the table cell content.
   */
  align: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * The table cell contents.
   */
  children: PropTypes.node,
  /**
   * Additional classes to be added to the row element.
   */
  className: PropTypes.string,
  /**
   * When provided, this will render the passed in component as the HTML element.
   * If this prop is undefined, it renders a `<th>` element if the parent component is `TableHead`,
   * otherwise, it renders a `<td>` element.
   */
  component: PropTypes.oneOf(['td', 'th']),
  /**
   * `TableCell` must define a `headers` prop for stackable tables with a `<td>` element.
   * The `headers` prop associates header and data cells for screen readers.
   * `headers` consist of a list of space-separated ids that each correspond to a `<td>` element.
   * [Read more about the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   */
  headers: PropTypes.string,
  /**
   * `TableCell` must define an `id` prop for stackable tables with a `<th>` element.
   * The `id` prop associates header and data cells for screen readers.
   */
  id: PropTypes.string,
  /**
   * If this prop is undefined, the component sets a scope attribute of `col` when the parent
   * component is `TableHead` to identify the header cell is a header for a column.
   */
  scope: PropTypes.oneOf(['row', 'col', 'rowgroup', 'colgroup']),
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName: PropTypes.string,
  /**
   * Table data cell's corresponding header title, this stacked title is displayed as the row header
   * when a responsive table is vertically stacked.
   */
  stackedTitle: PropTypes.string,
  /**
   * @hide-prop This gets set from the parent `TableHead` component
   */
  _isTableHeadChild: PropTypes.bool,
  /**
   * @hide-prop This gets set from the parent `Table` component
   */
  _stackable: PropTypes.bool,
};

export default TableCell;
