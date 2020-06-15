/**
 * A page block is a block of content on a page. There can be multiple page blocks
 * on a single page, and each can have a title, description, and code snippet.
 */
import HtmlExample from './HtmlExample';
import PropTypes from 'prop-types';
import React from 'react';
import ReactContent from './ReactContent';
import Source from './Source';
import classNames from 'classnames';

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

  statusBadge() {
    if (this.props.status) {
      const classes = classNames(
        'ds-c-badge ds-u-margin-right--1 ds-u-text-transform--capitalize',
        {
          'ds-c-badge--success': this.props.status === 'Ready',
          'ds-c-badge--alert': this.props.status === 'Draft',
        }
      );

      return (
        <div>
          <span className={classes}>{this.props.status}</span>
        </div>
      );
    }
  }

  description() {
    if (this.props.description) {
      return (
        <div
          className="c-details ds-u-margin-top--2 ds-u-measure--wide"
          dangerouslySetInnerHTML={{
            __html: this.props.description,
          }}
        />
      );
    }
  }

  GitHubSource() {
    if (this.props.hideHeader || this.props.header.match(/---/)) return;

    const source = this.props.reactComponentPath && (
      <Source key="reactSource" reactComponentPath={this.props.reactComponentPath} />
    );
    return [source];
  }

  header() {
    // The regex conditional allows us to create KSS comments that provide additional
    // descriptive text below a section that already has a title. For example,
    // you could have a KSS comment block that has the page title and
    // code snippet, then write a separate comment block that provides additional
    // text below the title + code snippet block. It's hacky, but works.
    if (this.props.hideHeader || this.props.header.match(/---/)) return;

    const subheader = this.props.reactComponentPath && <span key="subheader">React&nbsp;</span>;

    const subheaderComponent = this.props.reactComponentPath && (
      <span key="subheader">&nbsp;Component</span>
    );

    return [
      subheader,
      <span
        // Headers can contain HTML markup, therefore dangerously set...
        dangerouslySetInnerHTML={{ __html: this.props.header }}
        id={this.props.reference}
        key="header"
      />,
      subheaderComponent,
    ];
  }

  render() {
    return (
      <article className="ds-u-margin-y--3 ds-u-sm-margin-y--6 l-content">
        <h2 className="ds-h2 ds-u-margin-top--0">{this.header()}</h2>
        {this.statusBadge()}
        {this.GitHubSource()}
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
  status: PropTypes.string,
};

export default PageBlock;
