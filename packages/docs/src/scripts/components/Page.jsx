/**
 * A "page" is generated from a KSS comment block, so the structure is fairly
 * predictable: a header, description, and code snippet(s). A page can also
 * have nested pages.
 */

import React from 'react';
import HTMLExample from './HTMLExample';
import ReactComponentDoc from './ReactComponentDoc';
const reactDoc = require('../../data/react-doc.json');

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
                  showTitle={true}
               />;
      });
    }

    return (
      <section>
        <h3>CSS</h3>
        <HTMLExample markup={this.props.markup} showTitle={!!this.props.modifiers.length} />
        {modifierMarkup}
      </section>
    );
  }

  /**
   * Parse the full path of the Sass file where the main documentation
   * was generated from, and return the path relative to packages/
   * Example: packages/core/button.js -> core/button.js
   *
   * @return {String}
   */
  componentPath() {
    return this.props.source.path
      .match(/packages\/([a-z0-9_\-\/]+)/i)[1];
  }

  /**
   * Given a package's relative path, transform it to an NPM package path
   * Example: core/button.js -> @nava/cmsgov-design-system-core/button.js
   *
   * @return {String}
   */
  packagePath() {
    return `@nava/cmsgov-design-system-${this.componentPath()}`;
  }

  reactDoc() {
    if (!this.props.hasReactComponent) return;

    const componentPath = this.componentPath();
    const doc = reactDoc[`${componentPath}.jsx`];

    if (doc) {
      return <ReactComponentDoc
        componentPath={componentPath}
        description={doc.description}
        displayName={doc.displayName}
        packagePath={this.packagePath()}
        propDocs={doc.props}
      />;
    }
  }

  render() {
    return (
      <article>
        <h1>{this.props.header}</h1>
        <code>{this.props.source.filename}</code>
        <div dangerouslySetInnerHTML={{
          __html: this.props.description
        }} />

        {(
          this.props.markup || this.props.hasReactComponent
         ) && <h2>Usage</h2>
        }

        {this.markupExamples()}
        {this.reactDoc()}
      </article>
    );
  }
}

Page.propTypes = {
  description: React.PropTypes.string,
  header: React.PropTypes.string.isRequired,
  markup: React.PropTypes.string,
  modifiers: React.PropTypes.array,
  hasReactComponent: React.PropTypes.bool,
  source: React.PropTypes.shape({
    filename: React.PropTypes.string.isRequired,
    path: React.PropTypes.string.isRequired
  })
};

export default Page;
