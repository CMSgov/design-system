import React from 'react';
import PropTypes from 'prop-types';

const CodeSnippet = function(props) {
  return (
    <details className='ds-u-margin-bottom--2' open={props.open}>
      <summary className='ds-u-margin-y--1 ds-c-button ds-c-button--transparent ds-u-padding--1'>
        Code snippet
      </summary>
      <pre className={`language-${props.language}`}>
        <code dangerouslySetInnerHTML={{ __html: props.children }} />
      </pre>
    </details>
  );
};

CodeSnippet.defaultProps = {
  language: 'markup',
  open: false
};

CodeSnippet.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.oneOf(['markup', 'jsx']),
  open: PropTypes.bool
};

export default CodeSnippet;
