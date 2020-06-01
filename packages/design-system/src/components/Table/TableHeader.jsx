import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const TableHeader = (props) => {
  const { stackedTitle, title, type, width, scope, className, ...attributeOptions } = props;

  const classes = classNames(
    'ds-c-table__header',
    className,
    type === 'numeric' ? 'ds-c-table__header--numeric' : '',
    width ? 'ds-c-table__header--width-' + width : ''
  );

  return (
    <th
      className={classes}
      role={scope === 'col' ? 'columnheader' : 'rowheader'}
      scope={scope}
      {...attributeOptions}
    >
      {stackedTitle}
      {title}
    </th>
  );
};

TableHeader.defaultProps = {
  className: '',
  scope: 'col',
  stackedTitle: '',
  type: 'text',
};

TableHeader.propTypes = {
  /**
   * The title of table header/column.
   */
  title: PropTypes.PropTypes.node.isRequired,
  /**
   * Type of the header, can be either text or numeric for left or right alignment respectively.
   */
  type: PropTypes.oneOf(['text', 'numeric']),
  /**
   * The width of the header.
   */
  width: PropTypes.oneOf(['10', '20', '25', '33', '50', '75']),
  /**
   * Scope of the header, can be 'row' or 'col'.
   */
  scope: PropTypes.oneOf(['row', 'col']),
  /**
   * Additional classes to be added to the row element.
   */
  className: PropTypes.string,
  /**
   * The stacked row title for responsive table accessiblity.
   */
  stackedTitle: PropTypes.PropTypes.node,
};

export default TableHeader;
