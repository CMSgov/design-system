import PropTypes from 'prop-types';
import React from 'react';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import classNames from 'classnames';
export class TableBuilder extends React.PureComponent {
  /**
   * Determine if a React component is a Table components
   * @param {React.Node} child - a React component
   * @return {Boolean} Is this a Table components?
   */
  isTableComponents(child) {
    return child && (child.type === TableCell || child.type === TableHeader);
  }

  createStackedTitle(title) {
    return (
      <span aria-hidden="true" className="ds-c-table--stacked__col-header ds-u-font-weight--bold">
        {title}
        <br />
      </span>
    );
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (this.props.stacked && this.isTableComponents(child)) {
        // Extend props on tables before rendering.
        return React.cloneElement(child, {
          stackedTitle: this.createStackedTitle(child.props.title),
        });
      }

      return child;
    });
  }

  render() {
    const { className, stacked, striped, children, ...attributeOptions } = this.props;

    const classes = classNames(
      'ds-c-table',
      striped ? 'ds-c-table--striped' : '',
      stacked ? `ds-c-table--stacked-${stacked}` : '',
      className
    );

    return (
      <table className={classes} role="table" {...attributeOptions}>
        {this.renderChildren()}
      </table>
    );
  }
}

TableBuilder.defaultProps = {
  className: '',
};

TableBuilder.propTypes = {
  /**
   * The table wrapper content.
   * Must only contain `TableBody`, `TableCaption`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`, `TableWrapper` components
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root table element.
   */
  className: PropTypes.string,
  /**
   * Responsive design breakpoint prefix to apply stack cells style at different viewpoint sizes.
   */
  stacked: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * A striped variation of the table.
   */
  striped: PropTypes.bool,
};

export default TableBuilder;
