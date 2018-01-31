/**
 * ReactExample takes a component example's render function and
 * outputs a rendered example as well as a code snippet.
 */
import CodeSnippet from './CodeSnippet';
import Frame from './Frame';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
require('prismjs/components/prism-jsx');

class ReactExample extends React.PureComponent {
  highlightedMarkup() {
    return Prism.highlight(this.props.markup, Prism.languages.jsx);
  }

  render() {
    const rootPath = process.env.root ? `/${process.env.root}` : '';
    // GitHub Pages wants a trailing slash, otherwise it redirects to a blocked http page
    const iframeURL = `${rootPath}/example/${this.props.reference}/`;

    return (
      <div className="ds-u-margin-top--3 markup markup--react">
        <Frame
          onLoad={this.handleFrameLoad}
          responsive={this.props.responsive}
          src={iframeURL}
          title={`React example`}
        />

        <CodeSnippet>{this.highlightedMarkup()}</CodeSnippet>
      </div>
    );
  }
}

ReactExample.propTypes = {
  markup: PropTypes.string,
  reference: PropTypes.string,
  responsive: PropTypes.bool
};

export default ReactExample;
