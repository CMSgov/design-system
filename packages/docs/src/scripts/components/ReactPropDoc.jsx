/**
 * Render a table row for a single property
 */
import React from 'react';
import PropTypes from 'prop-types';

class ReactPropDoc extends React.PureComponent {
  defaultValue() {
    if (this.props.defaultValue) {
      return <code>{this.props.defaultValue.value}</code>;
    }
  }

  description() {
    if (this.props.description) {
      return <div dangerouslySetInnerHTML={{__html: this.props.description}} />;
    }
  }

  isRequired() {
    if (this.props.required) {
      return (
        <p>
          <span className='ds-c-badge ds-u-bg-gray-dark'>Required</span>
        </p>
      );
    }
  }

  // React.PropTypes.shape
  shape() {
    let values = this.props.type.value;

    if (values && typeof values.length === 'undefined') {
      return Object.getOwnPropertyNames(values.value).join(', ');
    }
  }

  type() {
    const propType = this.props.type.name;

    if (propType === 'arrayOf') {
      let valueType = this.props.type.value.name;

      if (valueType === 'shape') {
        valueType = `{${this.shape()}}`;
      }

      return `${propType}[${valueType}]`;
    }

    return propType;
  }

  // React.PropTypes.oneOf
  validValues() {
    let values = this.props.type.value;

    if (values && typeof values.length !== 'undefined') {
      values = values.map((v, i) => {
        const value = this.props.type.name === 'enum' ? v.value : v.name;
        return (
          <span key={value}>
            <code className='ds-u-font-size--small'>{value}</code>
            {i < values.length - 1 && ', '}
          </span>
        );
      });

      return <p>One of: {values}</p>;
    }
  }

  render() {
    return (
      <tr>
        <td>
          <code className='ds-u-font-weight--bold'>{this.props.name}</code>
          {this.isRequired()}
        </td>
        <td>
          <code>{this.type()}</code>
        </td>
        <td>
          {this.defaultValue()}
        </td>
        <td>
          {this.description()}
          {this.validValues()}
        </td>
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
      PropTypes.arrayOf( // oneOf
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.string
        })
      ),
      PropTypes.object // shape
    ])
  })
};

export default ReactPropDoc;
