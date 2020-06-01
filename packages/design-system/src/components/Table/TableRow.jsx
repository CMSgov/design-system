import PropTypes from 'prop-types';
import React from 'react';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import classNames from 'classnames';

export const TableRow = ({ children, className, ...attributeOptions }) => {
  const classes = classNames('ds-c-table__row', className);

  const checkStackedTitle = (childProps) => {
    return (
      childProps.stackedTitle ||
      (childProps.colheading && (
        <span
          aria-hidden="true"
          className="ds-c-table--stacked__col-header ds-u-font-weight--bold ds-u-padding-bottom--2"
        >
          {childProps.colheading}
        </span>
      ))
    );
  };

  /**
   * Determine if a React component is a Table components
   * @param {React.Node} child - a React component
   * @return {Boolean} Is this a Table components?
   */
  const isTableComponents = (child) => {
    // Preact doesn't support child.type
    return child && (child.type === TableCell || child.type === TableHeader);
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (isTableComponents(child)) {
        // Extend props on tables before rendering.
        return React.cloneElement(child, {
          stackedTitle: checkStackedTitle(child.props),
        });
      }
      return child;
    });
  };

  return (
    <tr className={classes} role="row" {...attributeOptions}>
      {renderChildren()}
    </tr>
  );
};

TableRow.defaultProps = {
  className: '',
};

TableRow.propTypes = {
  /**
   * The table row content.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the table row element.
   */
  className: PropTypes.string,
  /**
   * Additional classes to be added to the table row element.
   */
  colheading: PropTypes.string,
};

export default TableRow;
