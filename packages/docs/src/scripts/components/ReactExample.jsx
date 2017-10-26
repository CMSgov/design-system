/**
 * ReactExample takes a component example's render function and
 * outputs a rendered example as well as a code snippet.
 */
import CodeSnippet from './CodeSnippet';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
require('prismjs/components/prism-jsx');

class ReactExample extends React.PureComponent {
  constructor(props) {
    super(props);

    // Provide support to pass in a component with or without the extension
    const path = this.props.path.replace(/\.example\.jsx$/, '');

    // Resolve the example component relative to the /packages/ directory
    // Note: This actually causes Webpack to bundle all components in this directory
    // ending in ".example.jsx"
    // https://webpack.js.org/guides/dependency-management/#require-with-expression
    this.renderComponent = require(`../../../../${path}.example.jsx`).default;
  }

  highlightedMarkup() {
    const markup = reactElementToJSXString(this.renderComponent(), {
      showDefaultProps: false,
      showFunctions: true
    });

    return Prism.highlight(markup, Prism.languages.jsx);
  }

  render() {
    return (
      <div className="ds-u-margin-top--3 markup markup--react">
        <div className="ds-u-border--1 ds-u-padding--1">
          {this.renderComponent()}
        </div>

        <CodeSnippet language="jsx">{this.highlightedMarkup()}</CodeSnippet>
      </div>
    );
  }
}

ReactExample.propTypes = {
  path: PropTypes.string.isRequired
};

export default ReactExample;
