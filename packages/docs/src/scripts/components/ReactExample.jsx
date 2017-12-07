/**
 * ReactExample takes a component example's render function and
 * outputs a rendered example as well as a code snippet.
 */
import CodeSnippet from './CodeSnippet';
import Frame from './Frame';
// import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
// require('prismjs/components/prism-jsx');

class ReactExample extends React.PureComponent {
  highlightedMarkup() {
    // const markup = reactElementToJSXString(this.renderComponent(), {
    //   showDefaultProps: false,
    //   showFunctions: true
    // });
    // return Prism.highlight(markup, Prism.languages.jsx);
  }

  render() {
    const rootPath = process.env.root ? `/${process.env.root}` : '';
    const iframeURL = `${rootPath}/example/${this.props.reference}`;

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
  // path: PropTypes.string.isRequired,
  reference: PropTypes.string,
  responsive: PropTypes.bool
};

export default ReactExample;
