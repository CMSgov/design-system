/**
 * A page block is a block of content on a page. There can be multiple page blocks
 * on a single page, and each can have a title, description, and code snippet.
 */
import HTMLExample from './HTMLExample';
import PropTypes from 'prop-types';
import React from 'react';
import ReactComponentDoc from './ReactComponentDoc';
import Source from './Source';
import reactComponentPath from '../shared/reactComponentPath';
const reactDoc = require('../../data/react-doc.json');

class PageBlock extends React.PureComponent {
  markupExamples() {
    if (!this.props.markup) return;
    let modifierMarkup;

    if (this.props.modifiers) {
      modifierMarkup = this.props.modifiers.map(modifier => {
        return (
          <HTMLExample
            key={modifier.name}
            hideMarkup={this.props.hideMarkup}
            markup={this.props.markup}
            modifier={modifier}
            reference={this.props.reference}
            responsive={this.props.responsive}
          />
        );
      });
    }

    return (
      <section className='ds-u-margin-top--3'>
        <HTMLExample
          hideMarkup={this.props.hideMarkup}
          markup={this.props.markup}
          reference={this.props.reference}
          responsive={this.props.responsive}
          showTitle={false}
        />
        {modifierMarkup}
      </section>
    );
  }

  description() {
    if (this.props.description) {
      return (
        <div
          className='c-details ds-u-margin-top--2 ds-u-measure--wide'
          dangerouslySetInnerHTML={{
            __html: this.props.description
          }}
        />
      );
    }
  }

  header() {
    // The regex conditional allows us to create KSS comments that provide additional
    // descriptive text below a section that already has a title. For example,
    // you could have a KSS comment block that has the page title and
    // code snippet, then write a separate comment block that provides additional
    // text below the title + code snippet block. It's hacky, but works.
    if (this.props.hideHeader || this.props.header.match(/---/)) return;

    const source = this.props.reactComponent ? (
      <Source
        reactComponent={this.props.reactComponent}
        source={this.props.source}
      />
    ) : null;

    return (
      <div>
        <h2
          className='ds-h2'
          // Headers can contain HTML markup, therefore dangerously set...
          dangerouslySetInnerHTML={{ __html: this.props.header }}
          id={this.props.reference}
        />
        {source}
      </div>
    );
  }

  /**
   * Given a package's relative path, transform it to an NPM package path
   * Example: core/button.js -> @cmsgov/design-system-core/button.js
   *
   * @param {String} path - React component's path
   * @return {String}
   */
  packagePath(path) {
    return `@cmsgov/design-system-${path}`;
  }

  reactDoc() {
    if (!this.props.reactComponent) return;
    const path = reactComponentPath(this.props.source.path, this.props.reactComponent);
    const docs = reactDoc[`${path}.jsx`];

    if (docs && docs.length) {
      // There should only ever be one exported component definition
      const doc = docs[0];

      return (
        <ReactComponentDoc
          description={doc.description}
          displayName={doc.displayName}
          hideExample={this.props.hideExample}
          packagePath={this.packagePath(path)}
          propDocs={doc.props}
        />
      );
    }
  }

  render() {
    return (
      <article className='ds-u-margin-y--3 ds-u-sm-margin-y--6 l-content'>
        {this.header()}
        {this.description()}
        {this.markupExamples()}
        {this.reactDoc()}
      </article>
    );
  }
}

PageBlock.propTypes = {
  description: PropTypes.string,
  header: PropTypes.string.isRequired,
  hideExample: PropTypes.bool,
  hideHeader: PropTypes.bool,
  hideMarkup: PropTypes.bool,
  markup: PropTypes.string,
  modifiers: PropTypes.arrayOf(
    HTMLExample.propTypes.modifier
  ),
  reactComponent: PropTypes.string,
  reference: PropTypes.string,
  responsive: PropTypes.bool,
  source: Source.propTypes.source
};

export default PageBlock;
