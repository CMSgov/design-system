import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import classNames from 'classnames';

export const TableDataCell = ({
  children,
  className,
  headers,
  stackedClassName,
  stackedTitle,
  ...others
}) => {
  const tableStackableContext = useContext(TableContext);
  if (process.env.NODE_ENV !== 'production') {
    if (tableStackableContext && !headers) {
      console.warn(
        'The headers prop in `TableDataCell` is required for stackable tables. This prop is needed to associate the headings with data cells in the responsive stacked view.'
      );
    }
    if (tableStackableContext && !stackedTitle) {
      console.warn(
        'The stackedTitle prop in `TableDataCell` is required for stackable tables. This prop is displayed for the data cell in the responsive stacked view.'
      );
    }
  }
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
  children: PropTypes.node,
  /**
   * Additional classes to be added to the table cell element.
   */
  className: PropTypes.string,
  /**
   * `TableDataCell` must define a `headers` prop for stackable tables.
   * The `headers` prop is needed to associate header and data cells for screen readers.
   * `headers` consist of a list of space-separated ids that each correspond to a TableHeaderCell element.
   * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
   */
  headers: PropTypes.string,
  /**
   * Additional classes to be added to the stacked Title element.
   */
  stackedClassName: PropTypes.string,
  /**
   * This stacked title is displayed when a responsive table is vertically stacked.
   */
  stackedTitle: PropTypes.string,
};

export default TableDataCell;
