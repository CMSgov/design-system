import React from 'react';
import Nav from './Nav';
import Page from './Page';

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Nav pages={this.props.pages} />
        <main className='page'>
          <Page {...this.props.page} />
        </main>
      </div>
    );
  }
}

Docs.propTypes = {
  page: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array.isRequired
};

export default Docs;
