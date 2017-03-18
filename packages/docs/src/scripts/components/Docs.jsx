import React from 'react';
import Nav from './Nav';
import Page from './Page';
const sections = require('../../data/sections.json');

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Nav pages={sections} />
        <main className='page'>
          <Page {...this.props} />
        </main>
      </div>
    );
  }
}

export default Docs;
