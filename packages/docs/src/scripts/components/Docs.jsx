import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Nav from './Nav';
import Page from './Page';

class Docs extends React.Component {
  renderSections() {
    return this.props.sections.map(section => {
      return (
        <Route key={section.referenceNumber}
               path={`/${section.referenceURI}`}
               render={matchProps => (
                  <Page matchProps={matchProps} {...section} />
               )}
        />
      );
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav pages={this.props.sections} />
          <main className="page">
            {this.renderSections()}
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
