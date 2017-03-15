/**
 * Render a table with property documentation
 */

import React from 'react';
import ReactPropDoc from './ReactPropDoc';

class ReactPropDocs extends React.Component {
  rows() {
    const props = Object.getOwnPropertyNames(this.props.propDocs);

    return props.map(prop => {
      return <ReactPropDoc
        key={prop}
        name={prop}
        {...this.props.propDocs[prop]}
      />;
    });
  }

  render() {
    return (
      <table className='ds-c-table'>
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

ReactPropDocs.propTypes = {
  propDocs: React.PropTypes.object
};

export default ReactPropDocs;
