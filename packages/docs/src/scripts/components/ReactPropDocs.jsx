/**
 * Render a table with property documentation
 */

import PropTypes from 'prop-types';
import React from 'react';
import ReactPropDoc from './ReactPropDoc';

class ReactPropDocs extends React.PureComponent {
  rows() {
    const props = Object.getOwnPropertyNames(this.props.propDocs);

    return props.map(prop => {
      if (prop === 'children' || prop.match(/^_/)) return null;

      return (
        <ReactPropDoc
          key={prop}
          name={prop}
          {...this.props.propDocs[prop]}
        />
      );
    });
  }

  render() {
    return (
      <table className='ds-c-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{this.rows()}</tbody>
      </table>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
ReactPropDocs.propTypes = {
  propDocs: PropTypes.object
};

export default ReactPropDocs;
