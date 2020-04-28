import PropTypes from 'prop-types';
import React from 'react';

const CodeSnippet = function(props) {
  return (
    <details open={props.open}>
      <summary className="ds-u-margin-y--1 ds-c-button ds-c-button--small ds-c-button--transparent ds-u-padding--1 ds-u-text-decoration--none">
        Code snippet
      </summary>
      <pre className="ds-u-margin-bottom--4 ds-u-overflow--auto">
        <code dangerouslySetInnerHTML={{ __html: props.children }} />
      </pre>
    </details>
  );
};

CodeSnippet.defaultProps = {
  open: false
};

CodeSnippet.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool
};

export default CodeSnippet;
