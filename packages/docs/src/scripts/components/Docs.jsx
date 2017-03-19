import React from 'react';
import Nav from './Nav';
import Page from './Page';
const pages = require('../../data/pages.json');

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Nav pages={pages} />
        <main className='page'>
          <Page {...this.props} />
        </main>
      </div>
    );
  }
}

export default Docs;
