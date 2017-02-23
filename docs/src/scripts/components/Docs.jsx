import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Nav from './Nav';
import Page from './Page';

class Docs extends React.Component {
  renderSections() {
    console.log(this.props.sections);

    return this.props.sections.map(section => {
      return (
        <Route key={section.referenceNumber}
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
          <Nav />
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
