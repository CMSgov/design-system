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
    // Resolve the example component relative to the /packages/ directory
    this.renderComponent = require(`../../../../${this.props.path}.example.jsx`).default;
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
      <div className='markup markup--react'>
        <div className='ds-u-border--1 ds-u-padding--1'>
          {this.renderComponent()}
        </div>

        <CodeSnippet language='jsx'>
          {this.highlightedMarkup()}
        </CodeSnippet>
      </div>
    );
  }
}

ReactExample.propTypes = {
  path: PropTypes.string.isRequired
};

export default ReactExample;
