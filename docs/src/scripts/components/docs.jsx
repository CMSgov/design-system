import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Page from './page';

class Docs extends React.Component {
  renderSections() {
    console.log(this.props.sections);

    return this.props.sections.map(section => {
      return (
        <Route key={section.referenceNumber} render={matchProps => (
          <Page matchProps={matchProps}
                {...section}
            />
        )} />
      );
    });
  }

  render() {
    return (
      <Router>
        <main>
          <h1>Design System Documentation</h1>
          {this.renderSections()}
        </main>
      </Router>
    );
  }
}

Docs.propTypes = {
  sections: React.PropTypes.array.isRequired
};

export default Docs;
