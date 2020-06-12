import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableHeaderCell = ({
  title,
  type,
  width,
  scope,
  className,
  stackedTitle,
  stackedClassName,
  ...attributeOptions
}) => {
  const classes = classNames(
    'ds-c-table__header',
    className,
    type === 'numeric' ? 'ds-c-table__header--numeric' : null,
    width ? 'ds-c-table__header--width-' + width : null
  );

  const renderStackedTitle = () => {
    const stackedClasses = classNames(
      'ds-c-table--stacked__col-header',
      'ds-u-font-weight--bold',
      stackedClassName
    );
    const isValidStackedTitle = stackedTitle && stackedTitle.length > 0;
    return (
      { isValidStackedTitle } && (
        <span aria-hidden="true" className={stackedClasses}>
          {stackedTitle}
        </span>
      )
    );
  };

  return (
    <th
      className={classes}
      role={scope === 'col' ? 'columnheader' : 'rowheader'}
      scope={scope}
      {...attributeOptions}
    >
      {renderStackedTitle()}
      {title}
    </th>
  );
};

TableHeaderCell.defaultProps = {
  scope: 'col',
  type: 'text',
};

TableHeaderCell.propTypes = {
  /**
   * Additional classes to be added to the row element.
   */
  className: PropTypes.string,
  /**
   * The `id` attribute that is used as a header for other cells.
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
   * The title of table header/column.
   */
  title: PropTypes.PropTypes.node.isRequired,
  /**
   * Type of the header, can be either text or numeric for left or right alignment respectively.
   */
  type: PropTypes.oneOf(['text', 'numeric']),
  /**
   * Sets the width of `TableHeader` to a percentage of the `Table` width.
   */
  width: PropTypes.oneOf(['10', '20', '25', '30', '33', '50', '75']),
};

export default TableHeaderCell;
