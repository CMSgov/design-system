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
      return <div dangerouslySetInnerHTML={{ __html: this.props.description }} />;
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
      return values.map(v => (this.props.type.name === 'enum' ? v.value : v.name)).join(', ');
    }
  }

  render() {
    return (
      <tr>
        <td>
          <code className="ds-u-font-weight--bold">{this.props.name}</code>
          {this.isRequired()}
        </td>
        <td>
          <code>{this.type()}</code>
        </td>
        <td>{this.defaultValue()}</td>
        <td>{this.description()}</td>
      </tr>
    );
  }
}

ReactPropDoc.propTypes = {
  defaultValue: PropTypes.shape({
    value: PropTypes.string
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
          value: PropTypes.string
        })
      ),
      PropTypes.object // shape
    ])
  })
};

export default ReactPropDoc;
