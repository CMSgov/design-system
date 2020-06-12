import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableDataCell = (props) => {
  const {
    children,
    className,
    data,
    stackedTitle,
    stackedClassName,
    type,
    ...attributeOptions
  } = props;

  const classes = classNames(
    'ds-c-table__cell',
    className,
    type === 'numeric' ? 'ds-c-table__cell--numeric' : null
  );

  const stackedClasses = classNames(
    'ds-c-table--stacked__col-header',
    'ds-u-font-weight--bold',
    stackedClassName
  );

  const renderStackedTitle = () => {
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
    <td className={classes} role="cell" {...attributeOptions}>
      {renderStackedTitle()}
      {data}
      {children}
    </td>
  );
};

TableDataCell.defaultProps = {
  className: '',
  stackedClassName: '',
  type: 'text',
};

TableDataCell.propTypes = {
  /**
   * The table cell contents.
   */
  children: PropTypes.node,
  /**
   * Additional classes to be added to the table cell element.
   */
  className: PropTypes.string,
  /**
   * The table cell data.
   */
  data: PropTypes.node.isRequired,
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
  /**
   * Type of the data, can be either text or numeric for left or right alignment respectively.
   */
  type: PropTypes.oneOf(['text', 'numeric']),
};

export default TableDataCell;
