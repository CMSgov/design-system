/**
 * Render a table row for a single property
 */

import React from 'react';

class ReactPropDoc extends React.Component {
  defaultValue() {
    if (this.props.defaultValue) return (
      <p>
        Default: <code>{this.props.defaultValue.value}</code>
      </p>
    );
  }

  description() {
    if (this.props.description) return <p>{this.props.description}</p>;
  }

  isRequired() {
    if (this.props.required) return (
      <p>
        <span className="hc-c-badge hc-u-bg-gray-dark">Required</span>
      </p>
    );
  }

  validValues() {
    let value = this.props.type.value;
    if (value) {
      let values = value.map((v, i) => <code key={i}>{v.value}</code>);
      return <p>Valid values: {values}</p>;
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <strong><code>{this.props.type.name}</code></strong>
          {this.defaultValue()}
          {this.validValues()}
          {this.description()}
          {this.isRequired()}
        </td>
      </tr>
    );
  }
}

ReactPropDoc.propTypes = {
  defaultValue: React.PropTypes.shape({
    value: React.PropTypes.string
  }),
  description: React.PropTypes.string,
  name: React.PropTypes.string,
  required: React.PropTypes.bool.isRequired,
  type: React.PropTypes.shape({
    // Property type
    name: React.PropTypes.string.isRequired,
    // Valid values
    value: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.string
      })
    )
  }),
};

export default ReactPropDoc;
