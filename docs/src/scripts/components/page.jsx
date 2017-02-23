/**
 * A "page" is generated from a KSS comment block, so the structure is fairly
 * predictable: a header, description, and code snippet(s). A page can also
 * have nested pages.
 */

import React from 'react';
import HTMLExample from './HTMLExample';

class Page extends React.Component {
  markupExamples() {
    if (!this.props.markup) return;
    let modifierMarkup;

    if (this.props.modifiers.length) {
      modifierMarkup = this.props.modifiers.map(modifier => {
        return <HTMLExample
                  key={modifier}
                  markup={this.props.markup}
                  modifier={modifier}
               />;
      });
    }

    return (
      <div>
        <HTMLExample markup={this.props.markup} />
        {modifierMarkup}
      </div>
    );
  }

  render() {
    return (
      <section>
        <h2>{this.props.header}</h2>
        <div dangerouslySetInnerHTML={{
          __html: this.props.description
        }} />
        {this.markupExamples()}
      </section>
    );
  }
}

Page.propTypes = {
  description: React.PropTypes.string,
  header: React.PropTypes.string.isRequired,
  markup: React.PropTypes.string,
  modifiers: React.PropTypes.array,
};

export default Page;
