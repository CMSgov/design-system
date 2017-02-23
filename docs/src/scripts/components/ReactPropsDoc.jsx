/**
 * Render a table with property documentation
 */

import React from 'react';

class ReactPropsDoc extends React.Component {
  requiredLabel(propDoc) {
    if (propDoc.required) return <strong>Required</strong>;
  }

  enumDoc(propDoc) {
    let value = propDoc.type.value;
    if (value) {
      let values = value.map(v => <code>{v.value}</code>);
      return <p>Valid values: {values}</p>;
    }
  }

  rows() {
    const props = Object.getOwnPropertyNames(this.props.propDocs);

    return props.map(prop => {
      const propDoc = this.props.propDocs[prop];
      return (
        <tr key={prop}>
          <td>{prop}</td>
          <td>
            <strong><code>{propDoc.type.name}</code></strong>
            {propDoc.defaultValue && `= ${propDoc.defaultValue.value}`}
            {this.enumDoc(propDoc)}
            <p>{propDoc.description}</p>
            {this.requiredLabel(propDoc)}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>Prop</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>{this.rows()}</tbody>
      </table>
    );
  }
}

ReactPropsDoc.propTypes = {
  propDocs: React.PropTypes.object
};

export default ReactPropsDoc;
