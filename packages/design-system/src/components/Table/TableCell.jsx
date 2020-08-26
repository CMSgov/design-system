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
  ...others
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

  let role;
  let Component;
  if (component) {
    Component = component;
    if (_isTableHeadChild) {
      role = 'columnheader';
    } else if (component === 'th') {
      role = 'rowheader';
    }
  } else {
    Component = _isTableHeadChild ? 'th' : 'td';
  }

  let defaultScope = scope;
  if (!defaultScope && _isTableHeadChild) {
    defaultScope = 'col';
  }

  const alignText = align ? `ds-u-text-align--${align}` : null;
  const defaultClassName = _isTableHeadChild ? 'ds-c-table__header' : 'ds-c-table__cell';
  const classes = classNames(defaultClassName, alignText, className);
  const stackedClasses = classNames(
    'ds-c-table--stacked__col-header',
    'ds-u-font-weight--bold',
    stackedClassName
  );
  const isValidStackedTitle = stackedTitle && stackedTitle.length > 0;

  return (
    <Component
      className={classes}
      role={role}
      scope={defaultScope}
      headers={headers}
      id={id}
      {...others}
    >
      {isValidStackedTitle && (
        <span aria-hidden="true" className={stackedClasses}>
          {stackedTitle}
        </span>
      )}
      {children}
    </Component>
  );
};

TableCell.defaultProps = {
  scope: 'row',
  _isTableHeadChild: false,
  _stackable: false,
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
   * `TableCell` must define a `headers` prop for stackable tables with a `<td>` element.
   * The `headers` prop is needed to associate header and data cells for screen readers.
   * `headers` consist of a list of space-separated ids that each correspond to a `<td>` element.
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   */
  headers: PropTypes.string,
  /**
   * `TableCell` must define an `id` prop for stackable tables with a `<th>` element .
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   * The `id` prop associates header and data cells for screen readers.
   */
  id: PropTypes.string,
  /**
   * If this prop is not defined, the component sets a scope attribute of `col` when the parent
   * component is `TableHead` or otherwise a scope attribute of `row`.
   */
  scope: PropTypes.oneOf(['row', 'col', 'rowgroup', 'colgroup']),
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName: PropTypes.string,
  /**
   * Table data cell's corresponding header title, this stacked title is displayed when a responsive table
   * is vertically stacked.
   */
  stackedTitle: PropTypes.string,
  /**
   * If this prop is not defined, the component renders a `<th>` element
   * when the parent component is `TableHead` or otherwise a `<td>` element.
   */
  component: PropTypes.oneOf(['td', 'th']),
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
