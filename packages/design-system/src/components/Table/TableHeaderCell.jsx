import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
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
  const tableStackableContext = useContext(TableContext);
  if (process.env.NODE_ENV !== 'production') {
    if (tableStackableContext && !id) {
      console.warn(
        `Please provide an 'id' prop for stackable table, it is a required prop for screen readers to create association between the heading id and data cells.`
      );
    }
  }

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
   * Table Data cells that is a header, must have a `headers` attribute for stackable table.
   * This prop has the same function as the `headers` prop on `TableDataCell` component.
   */
  headers: PropTypes.string,
  /**
   * Table Header cells must have an`id` attribute for stackable table.
   * For screen readers to create association between the header and data cells.
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
