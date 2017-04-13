/**
 * ReactComponentExample takes a component example's render function and
 * outputs a rendered example as well as a code snippet.
 */
import Prism from 'prismjs';
require('prismjs/components/prism-jsx');
import React from 'react';
import PropTypes from 'prop-types';
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
      <div className='markup markup--react'>
        <div className='ds-u-border--1 ds-u-padding--1'>
          {this.props.renderComponent()}
        </div>

        <pre className='language-jsx'>
          <code dangerouslySetInnerHTML={{ __html: this.highlightedMarkup() }} />
        </pre>
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
