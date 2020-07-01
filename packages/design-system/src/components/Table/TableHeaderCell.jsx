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
  width,
  ...others
}) => {
  const classes = classNames(
    'ds-c-table__header',
    className,
    width ? 'ds-c-table__header--width-' + width : null
  );
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
  /**
   * The table header cell contents.
   */
  children: PropTypes.node,
  /**
   * Additional classes to be added to the row element.
   */
  className: PropTypes.string,
  /**
   * The `id` attribute is used as a header for other cells to create associations between headers and cells.
   */
  id: PropTypes.string,
  /**
   * Scope of the header, can be 'row' or 'col'.
   */
  scope: PropTypes.oneOf(['row', 'col']),
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName: PropTypes.string,
  /**
   * The stacked row title for responsive table accessiblity.
   */
  stackedTitle: PropTypes.string,
  /**
   * Sets the width of `TableHeader` to a percentage of the `Table` width.
   */
  width: PropTypes.oneOf(['10', '15', '20', '25', '30', '33', '40', '50', '75']),
};

export default TableHeaderCell;
