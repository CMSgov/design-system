/**
 * HtmlExample takes the markup from a KSS "Markup:" section and shows
 * a preview and code snippet for the given markup
 */
import CodeSnippet from './CodeSnippet';
import Frame from './Frame';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
import processMarkup from '../shared/processMarkup';

class HtmlExample extends React.PureComponent {
  highlightedMarkup() {
    const markup = processMarkup(this.props.markup, this.props.modifier);
    return Prism.highlight(markup, Prism.languages.markup);
  }

  snippet() {
    if (!this.props.hideMarkup) {
      return <CodeSnippet>{this.highlightedMarkup()}</CodeSnippet>;
    }
  }

  name() {
    return this.props.modifier ? this.props.modifier.className : 'Default';
  }

  title() {
    if (!this.props.showTitle) return;
    const description = this.props.modifier && this.props.modifier.description;

    return (
      <div className="c-markup__header">
        <h4 className="ds-u-font-size--h5 ds-u-margin-bottom--0">
          Modifier: <code>{this.name()}</code>
        </h4>
        <p
          className="ds-u-margin-bottom--1 ds-u-margin-top--0 ds-u-color--muted"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    );
  }

  render() {
    const rootPath = process.env.root ? `/${process.env.root}` : '';
    let iframeURL = `${rootPath}/example/${this.props.reference}`;

    if (this.props.modifier) {
      iframeURL += `.${this.props.modifier.name}`;
    }

    // GitHub Pages wants a trailing slash, otherwise it redirects to a blocked http page
    iframeURL += '/';

    return (
      <div className="markup markup--html">
        {this.title()}
        <Frame
          onLoad={this.handleFrameLoad}
          responsive={this.props.responsive}
          src={iframeURL}
          title={`${this.name()} example`}
        />
        {this.snippet()}
      </div>
    );
  }
}

HtmlExample.propTypes = {
  hideMarkup: PropTypes.bool,
  markup: PropTypes.string.isRequired,
  modifier: PropTypes.shape({
    className: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string.isRequired
  }),
  reference: PropTypes.string,
  responsive: PropTypes.bool,
  showTitle: PropTypes.bool
};

HtmlExample.defaultProps = {
  showTitle: true
};

export default HtmlExample;
