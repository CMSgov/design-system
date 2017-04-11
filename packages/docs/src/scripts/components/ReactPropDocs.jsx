/**
 * Render a table with property documentation
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactPropDoc from './ReactPropDoc';

class ReactPropDocs extends React.PureComponent {
  rows() {
    const props = Object.getOwnPropertyNames(this.props.propDocs);

    return props.map(prop => {
      if (prop === 'children') return null;

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
            <td>Name</td>
            <td>Type</td>
            <td>Default</td>
            <td>Description</td>
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
