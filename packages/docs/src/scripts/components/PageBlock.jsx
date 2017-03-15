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
          key={modifier.name}
          hideMarkup={this.props.hideMarkup}
          markup={this.props.markup}
          modifier={modifier}
        />;
      });
    }

    return (
      <section className='ds-u-margin-top--5'>
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

  description() {
    if (this.props.description) {
      return (
        <details className='c-details ds-u-margin-top--2'>
          <summary>Details and instructions</summary>

          <div dangerouslySetInnerHTML={{
            __html: this.props.description
          }} />
        </details>
      );
    }
  }

  /**
   * Given a package's relative path, transform it to an NPM package path
   * Example: core/button.js -> @cmsgov/design-system-core/button.js
   *
   * @return {String}
   */
  packagePath() {
    return `@cmsgov/design-system-${this.componentPath()}`;
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
    // TODO(sawyer): Make sure we move away from using the <details> element
    // since IE doesn't support it
    return (
      <article className='c-block ds-u-margin-bottom--7'>
        <heading className='block__heading'>
          {this.statusPill()}
          <h1 className='ds-h1 ds-u-margin-bottom--0 ds-u-margin-top--2'>{this.props.header}</h1>
          <div className='ds-u-clearfix' />
          <code className='ds-u-font-size--small'>{this.props.source.filename}:{this.props.source.line}</code>
          {this.uswdsLink()}
        </heading>

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
  modifiers: React.PropTypes.array,
  hasReactComponent: React.PropTypes.bool,
  sections: React.PropTypes.array,
  source: React.PropTypes.shape({
    filename: React.PropTypes.string.isRequired,
    line: React.PropTypes.number.isRequired,
    path: React.PropTypes.string.isRequired
  }),
  status: React.PropTypes.string,
  uswdsUrl: React.PropTypes.string
};

export default PageBlock;
