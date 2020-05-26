import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableCell = ({ className, cellFunc, data, titleTag, type, ...attributeOptions }) => {
  const classes = classNames(
    'ds-c-table__cell',
    className,
    type === 'numeric' ? 'ds-c-table__cell--numeric' : ''
  );

  return (
    <td className={classes} role="cell" {...attributeOptions}>
      {titleTag}
      {cellFunc || data}
    </td>
  );
};

TableCell.defaultProps = {
  className: '',
  titleTag: '',
  type: 'text',
};

TableCell.propTypes = {
  /**
   * Customised function to render for the cell
   */
  cellFunc: PropTypes.node,
  /**
   * Additional classes to be added to the table cell element.
   */
  className: PropTypes.string,
  /**
   * The table cell data.
   */
  data: PropTypes.node.isRequired,
  /**
   * The stacked row title for responsive table accessiblity.
   */
  titleTag: PropTypes.node,
  /**
   * Type of the data, can be either text or numeric for left or right alignment respectively.
   */
  type: PropTypes.oneOf(['text', 'numeric']),
};

export default TableCell;
