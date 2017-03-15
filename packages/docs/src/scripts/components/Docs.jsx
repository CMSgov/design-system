import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Nav from './Nav';
import Page from './Page';

class Docs extends React.Component {
  routes(sections) {
    return sections.map(section => {
      let routes = [<Route
        key={section.referenceNumber}
        path={`/${section.referenceURI}`}
        render={matchProps => (
          <Page matchProps={matchProps} {...section} />
       )} />];

      // Nested sections
      if (section.sections.length) { routes = routes.concat(this.routes(section.sections)); }

      return routes;
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav pages={this.props.sections} />
          <main className='page'>
            {this.routes(this.props.sections)}
          </main>
        </div>
      </Router>
    );
  }
}

Docs.propTypes = {
  sections: React.PropTypes.array.isRequired
};

export default Docs;
