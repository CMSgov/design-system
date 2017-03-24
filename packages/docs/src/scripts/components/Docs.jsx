import React from 'react';
import Nav from './Nav';
import Page from './Page';

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Nav
          currentPageURI={this.props.page.referenceURI}
          routes={this.props.routes}
        />
        <main className='page'>
          <Page {...this.props.page} />
        </main>
      </div>
    );
  }
}

Docs.propTypes = {
  page: React.PropTypes.object.isRequired,
  routes: React.PropTypes.array.isRequired
};

export default Docs;
