/**
 * ReactComponentExample takes a component example's render function and
 * outputs a rendered example as well as a code snippet.
 */
import CodeSnippet from './CodeSnippet';
import Prism from 'prismjs';
require('prismjs/components/prism-jsx');
import PropTypes from 'prop-types';
import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

class ReactComponentExample extends React.PureComponent {
  highlightedMarkup() {
    let markup = reactElementToJSXString(this.props.renderComponent(), {
      showDefaultProps: false,
      showFunctions: true
    });

    return Prism.highlight(markup, Prism.languages.jsx);
  }

  render() {
    return (
      <div className='markup markup--react ds-u-border--1 ds-u-padding-top--2 ds-u-padding-right--2 ds-u-padding-bottom--0 ds-u-padding-left--2'>
        <div>
          {this.props.renderComponent()}
        </div>

        <CodeSnippet language='jsx'>
          {this.highlightedMarkup()}
        </CodeSnippet>
      </div>
    );
  }
}

ReactComponentExample.propTypes = {
  /**
   * The exported render function from the .example.jsx file
   */
  renderComponent: PropTypes.func.isRequired
};

export default ReactComponentExample;
