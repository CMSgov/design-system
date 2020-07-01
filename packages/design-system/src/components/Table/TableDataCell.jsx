import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableDataCell = ({
  children,
  className,
  headers,
  stackedClassName,
  stackedTitle,
  ...others
}) => {
  const classes = classNames('ds-c-table__cell', className);
  const stackedClasses = classNames(
    'ds-c-table--stacked__col-header',
    'ds-u-font-weight--bold',
    stackedClassName
  );
  const isValidStackedTitle = stackedTitle && stackedTitle.length > 0;

  return (
    <td className={classes} role="cell" header={headers} {...others}>
      {isValidStackedTitle && (
        <span aria-hidden="true" className={stackedClasses}>
          {stackedTitle}
        </span>
      )}
      {children}
    </td>
  );
};

TableDataCell.propTypes = {
  /**
   * The table data cell contents.
   */
  children: PropTypes.node,
  /**
   * Additional classes to be added to the table cell element.
   */
  className: PropTypes.string,
  /**
   * The `headers` attribute contains a list of `id` attributes of the associated data. If there is more than one id, they are separated by spaces.
   */
  headers: PropTypes.string,
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName: PropTypes.string,
  /**
   * The stacked row title for responsive table accessiblity.
   */
  stackedTitle: PropTypes.string,
};

export default TableDataCell;
