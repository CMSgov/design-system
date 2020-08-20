import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableHeaderCell = ({
  children,
  className,
  id,
  scope,
  stackedTitle,
  stackedClassName,
  ...others
}) => {
  // TODO: provide warning message on development for `id` and `stackedTitle` props
  // for stacktable when child ds have upgraded to react ^16.3 (context api)
  const classes = classNames('ds-c-table__header', className);
  const stackedClasses = classNames(
    'ds-c-table--stacked__col-header',
    'ds-u-font-weight--bold',
    stackedClassName
  );
  const isValidStackedTitle = stackedTitle && stackedTitle.length > 0;

  return (
    <th
      className={classes}
      role={scope === 'col' ? 'columnheader' : 'rowheader'}
      scope={scope}
      id={id}
      {...others}
    >
      {isValidStackedTitle && (
        <span aria-hidden="true" className={stackedClasses}>
          {stackedTitle}
        </span>
      )}
      {children}
    </th>
  );
};

TableHeaderCell.defaultProps = {
  scope: 'col',
};

TableHeaderCell.propTypes = {
  children: PropTypes.node,
  /**
   * Additional classes to be added to the row element.
   */
  className: PropTypes.string,
  /**
   * Define a `headers` prop for stackable tables with row header cells.
   * This prop has the same function as the `headers` prop on `TableDataCell` component.
   */
  headers: PropTypes.string,
  /**
   * `TableHeaderCells` must define an `id` prop for stackable tables.
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   * The `id` prop associates header and data cells for screen readers.
   */
  id: PropTypes.string,
  /**
   * Scope of the header, use 'row' or 'col' for simple tables.
   */
  scope: PropTypes.oneOf(['row', 'col', 'rowgroup', 'colgroup']),
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName: PropTypes.string,
  /**
   * Table Data cells that is a header, this stacked title is displayed when a responsive table is vertically stacked.
   */
  stackedTitle: PropTypes.string,
};

export default TableHeaderCell;
