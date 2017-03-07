/**
 * A "page block" is generated from a KSS comment block, so the structure is fairly
 * predictable: a header, description, and code snippet(s).
 */
import React from 'react';
import HTMLExample from './HTMLExample';
import ReactComponentDoc from './ReactComponentDoc';
const reactDoc = require('../../data/react-doc.json');

class PageBlock extends React.Component {
  markupExamples() {
    if (!this.props.markup) return;
    let modifierMarkup;

    if (this.props.modifiers.length) {
      modifierMarkup = this.props.modifiers.map(modifier => {
        return <HTMLExample
                  key={modifier}
                  hideMarkup={this.props.hideMarkup}
                  markup={this.props.markup}
                  modifier={modifier}
                  showTitle={true}
               />;
      });
    }

    return (
      <section>
        <h3>HTML</h3>
        <HTMLExample
          hideMarkup={this.props.hideMarkup}
          markup={this.props.markup}
          showTitle={!!this.props.modifiers.length}
        />
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

  statusPill() {
    if (this.props.status) {
      return (
        <span className="ds-c-badge ds-u-margin-left--1 ds-u-text-transform--capitalize ds-u-valign--middle ds-u-fill--warn ds-u-color--base">
          {this.props.status}
        </span>
      );
    }
  }

  render() {
    return (
      <article className="ds-u-margin-bottom--8">
        <heading className="block__heading">
          <h1 className="ds-u-font-size--h2 ds-u-margin-bottom--0">
            {this.props.header}
            {this.statusPill()}
          </h1>
          <code className="ds-u-font-size--base">{this.props.source.filename}:{this.props.source.line}</code>
        </heading>

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

PageBlock.propTypes = {
  description: React.PropTypes.string,
  header: React.PropTypes.string.isRequired,
  hideMarkup: React.PropTypes.bool,
  markup: React.PropTypes.string,
  modifiers: React.PropTypes.array,
  hasReactComponent: React.PropTypes.bool,
  sections: React.PropTypes.array,
  source: React.PropTypes.shape({
    filename: React.PropTypes.string.isRequired,
    line: React.PropTypes.number.isRequired,
    path: React.PropTypes.string.isRequired
  }),
  status: React.PropTypes.string
};

export default PageBlock;
