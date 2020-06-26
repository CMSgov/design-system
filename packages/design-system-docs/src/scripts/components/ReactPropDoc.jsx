/**
 * Render a table row for a single property
 */
import PropTypes from 'prop-types';
import React from 'react';

class ReactPropDoc extends React.PureComponent {
  defaultValue() {
    if (this.props.defaultValue) {
      return <code>{this.props.defaultValue.value}</code>;
    }
  }

  description() {
    if (this.props.description) {
      return <span dangerouslySetInnerHTML={{ __html: this.props.description }} />;
    }
  }

  isRequired() {
    if (this.props.required) {
      return (
        <p>
          <span className="ds-c-badge ds-u-bg-gray-dark">Required</span>
        </p>
      );
    }
  }

  // React.PropTypes.shape
  shape() {
    const values = this.props.type.value;

    if (values && typeof values.length === 'undefined') {
      return Object.getOwnPropertyNames(values.value).join(', ');
    }
  }

  type() {
    const propType = this.props.type.name;
    const validValues = this.validValues();

    if (propType === 'arrayOf') {
      let valueType = this.props.type.value.name;

      if (valueType === 'shape') {
        valueType = this.props.type.value.computed
          ? this.props.type.value.value
          : `{${this.shape()}}`;
      }

      return `${propType}[${valueType}]`;
    } else if (propType === 'node') {
      return 'string, number, element, or array';
    } else if (validValues) {
      return validValues;
    }

    return propType;
  }

  // React.PropTypes.oneOf
  validValues() {
    const values = this.props.type.value;

    if (values && typeof values.length !== 'undefined') {
      return values.map((v) => (this.props.type.name === 'enum' ? v.value : v.name)).join(', ');
    }
  }

  render() {
    // Specify ARIA roles attribute for table to ensure responsive HTML table is accessible to screen readers
    return (
      <tr role="row">
        <td role="cell" headers="columnname">
          <span className="docs_table__column-header ds-u-font-weight--bold" aria-hidden="true">
            Name
            <br />
          </span>
          <code className="ds-u-font-weight--bold">{this.props.name}</code>
          {this.isRequired()}
        </td>
        <td role="cell" headers="columntype">
          <span className="docs_table__column-header ds-u-font-weight--bold" aria-hidden="true">
            Type
            <br />
          </span>
          <code>{this.type()}</code>
        </td>
        <td role="cell" headers="columndefault">
          <span className="docs_table__column-header ds-u-font-weight--bold" aria-hidden="true">
            Default
            <br />
          </span>
          {this.defaultValue()}
        </td>
        <td role="cell" headers="columndescription">
          <span className="docs_table__column-header ds-u-font-weight--bold" aria-hidden="true">
            Description
            <br />
          </span>
          {this.description()}
        </td>
      </tr>
    );
  }
}

ReactPropDoc.propTypes = {
  defaultValue: PropTypes.shape({
    value: PropTypes.string,
  }),
  description: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool.isRequired,
  type: PropTypes.shape({
    // Property type
    name: PropTypes.string.isRequired,
    // Valid values
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(
        // oneOf
        PropTypes.shape({
          computed: PropTypes.bool,
          name: PropTypes.string,
          value: PropTypes.string,
        })
      ),
      PropTypes.object, // shape
    ]),
  }),
};

export default ReactPropDoc;
