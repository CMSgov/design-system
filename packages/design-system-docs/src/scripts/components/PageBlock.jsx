/**
 * A page block is a block of content on a page. There can be multiple page blocks
 * on a single page, and each can have a title, description, and code snippet.
 */
import HtmlExample from './HtmlExample';
import PropTypes from 'prop-types';
import React from 'react';
import ReactContent from './ReactContent';
import Source from './Source';

class PageBlock extends React.PureComponent {
  markupExamples() {
    if (!this.props.markup) return;
    let modifierMarkup;

    if (this.props.modifiers) {
      modifierMarkup = this.props.modifiers.map((modifier) => {
        return (
          <HtmlExample
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
      <section className="ds-u-margin-top--3">
        <HtmlExample
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
      /* eslint-disable react/no-danger */
      return (
        <div
          className="c-page-block-description ds-u-margin-top--2 ds-u-measure--wide"
          dangerouslySetInnerHTML={{
            __html: this.props.description,
          }}
        />
      );
      /* eslint-enable react/no-danger */
    }
  }

  header() {
    // The regex conditional allows us to create KSS comments that provide additional
    // descriptive text below a section that already has a title. For example,
    // you could have a KSS comment block that has the page title and
    // code snippet, then write a separate comment block that provides additional
    // text below the title + code snippet block. It's hacky, but works.
    if (this.props.hideHeader || this.props.header.match(/---/)) return;

    const source = this.props.reactComponentPath && (
      <Source key="reactSource" reactComponentPath={this.props.reactComponentPath} />
    );

    const subheader = this.props.reactComponentPath && (
      <span className="ds-h6" key="subheader">
        React
      </span>
    );

    /* eslint-disable react/no-danger */
    return [
      subheader,
      <h2
        className="ds-h2 ds-u-margin-top--0"
        // Headers can contain HTML markup, therefore dangerously set...
        dangerouslySetInnerHTML={{ __html: this.props.header }}
        id={this.props.reference}
        key="header"
      />,
      source,
    ];
    /* eslint-enable react/no-danger */
  }

  render() {
    return (
      <article className="ds-u-margin-y--3 ds-u-sm-margin-y--6 c-page-block-container">
        {this.header()}
        {this.description()}
        {this.markupExamples()}
        <ReactContent
          reactComponentProps={this.props.reactComponentProps}
          reactExampleSource={this.props.reactExampleSource}
          reference={this.props.reference}
          responsive={this.props.responsive}
        />
      </article>
    );
  }
}

PageBlock.propTypes = {
  description: PropTypes.string,
  header: PropTypes.string.isRequired,
  hideHeader: PropTypes.bool,
  hideMarkup: PropTypes.bool,
  markup: PropTypes.string,
  modifiers: PropTypes.arrayOf(HtmlExample.propTypes.modifier),
  reactComponentProps: ReactContent.propTypes.reactComponentProps,
  reactComponentPath: PropTypes.string,
  reactExampleSource: ReactContent.propTypes.reactExampleSource,
  reference: PropTypes.string,
  responsive: PropTypes.bool,
};

export default PageBlock;
