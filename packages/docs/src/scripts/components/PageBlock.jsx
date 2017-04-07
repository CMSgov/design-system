/**
 * A "page block" is generated from a KSS comment block, so the structure is fairly
 * predictable: a header, description, and code snippet(s).
 */
import React from 'react';
import HTMLExample from './HTMLExample';
import ReactComponentDoc from './ReactComponentDoc';
const reactDoc = require('../../data/react-doc.json');

class PageBlock extends React.PureComponent {
  markupExamples() {
    if (!this.props.markup) return;
    let modifierMarkup;

    if (this.props.modifiers.length) {
      modifierMarkup = this.props.modifiers.map(modifier => {
        return (
          <HTMLExample
            key={modifier.name}
            hideMarkup={this.props.hideMarkup}
            markup={this.props.markup}
            modifier={modifier}
          />
        );
      });
    }

    return (
      <section className='ds-u-margin-top--3'>
        <HTMLExample
          hideMarkup={this.props.hideMarkup}
          markup={this.props.markup}
          showTitle={false}
        />
        {modifierMarkup}
      </section>
    );
  }

  /**
   * Use the full path of the Sass file where the KSS documentation
   * was generated from, and return the path relative to packages/
   * and with the React component's filename.
   *
   * @return {String}
   */
  reactComponentPath() {
    // Get path relative to packages/
    // Example: packages/core/components/Button.scss -> core/component/Button
    const path = this.props.source.path.match(/packages\/([a-z0-9_\-/]+)/i)[1];

    // Replace the Sass filename with the React component's filename
    // Example: core/component/Button -> core/component/ButtonGroup
    return path.replace(/\/([a-z0-9_-]+)$/i, `/${this.props.reactComponent}`);
  }

  description() {
    if (this.props.description) {
      return (
        <div
          className='c-details ds-u-margin-top--2'
          dangerouslySetInnerHTML={{
            __html: this.props.description
          }}
        />
      );
    }
  }

  header() {
    // This conditional allows us to create KSS comments that provide additional
    // descriptive text below a section that already has a title. For example,
    // you could have a KSS comment block that has the page title and
    // code snippet, then write a separate comment block that provides additional
    // text below the title + code snippet block. It's hacky, but works.
    if (this.props.header.match(/---/)) return;

    return (
      <heading className='block__heading'>
        {this.statusPill()}
        <h1
          className='ds-h1 ds-u-margin-bottom--0 ds-u-margin-top--2'
          dangerouslySetInnerHTML={{
            __html: this.props.header
          }}
        />
        <div className='ds-u-clearfix' />
        {this.source()}
        {this.uswdsLink()}
      </heading>
    );
  }

  /**
   * Given a package's relative path, transform it to an NPM package path
   * Example: core/button.js -> @cmsgov/design-system-core/button.js
   *
   * @return {String}
   */
  packagePath() {
    return `@cmsgov/design-system-${this.reactComponentPath()}`;
  }

  reactDoc() {
    if (!this.props.reactComponent) return;
    const doc = reactDoc[`${this.reactComponentPath()}.jsx`];

    if (doc) {
      return (
        <ReactComponentDoc
          description={doc.description}
          displayName={doc.displayName}
          packagePath={this.packagePath()}
          propDocs={doc.props}
        />
      );
    }
  }

  source() {
    if (this.props.reactComponent || this.props.source) {
      const path = this.props.reactComponent
        ? this.reactComponentPath().replace(/[a-z-]+\/src\//, '')
        : `${this.props.source.filename}:${this.props.source.line}`;

      return (
        <code className='ds-u-font-size--small'>{path}</code>
      );
    }
  }

  statusPill() {
    if (this.props.status) {
      return (
        <span className='ds-c-badge ds-u-float--right ds-u-margin-top--2 ds-u-text-transform--capitalize ds-u-fill--warn ds-u-color--base'>
          {this.props.status}
        </span>
      );
    }
  }

  uswdsLink() {
    if (this.props.uswdsUrl) {
      return (
        <p>
          <a href={this.props.uswdsUrl}>US Web Design Standard</a>
        </p>
      );
    }
  }

  render() {
    return (
      <article className='c-block ds-u-margin-bottom--7'>
        {this.header()}
        {this.description()}
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
  modifiers: React.PropTypes.arrayOf(
    HTMLExample.propTypes.modifier
  ),
  reactComponent: React.PropTypes.string,
  source: React.PropTypes.shape({
    filename: React.PropTypes.string.isRequired,
    line: React.PropTypes.number.isRequired,
    path: React.PropTypes.string.isRequired
  }),
  status: React.PropTypes.string,
  uswdsUrl: React.PropTypes.string
};

export default PageBlock;
