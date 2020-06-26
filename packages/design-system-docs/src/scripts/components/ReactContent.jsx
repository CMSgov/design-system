import PropTypes from 'prop-types';
import React from 'react';
import ReactExample from './ReactExample';
import ReactPropDocs from './ReactPropDocs';

/**
 * If a React component's props documentation or example is available,
 * this component will return whatever is present.
 */
function ReactContent(props) {
  return (
    <>
      {props.reactExampleSource && (
        <ReactExample
          key="example"
          markup={props.reactExampleSource}
          reference={props.reference}
          responsive={props.responsive}
        />
      )}
      {props.reactComponentProps && (
        <ReactPropDocs key="propDocs" propDocs={props.reactComponentProps} />
      )}
    </>
  );
}

ReactContent.propTypes = {
  reactComponentProps: ReactPropDocs.propTypes.propDocs,
  reactExampleSource: ReactExample.propTypes.markup,
  reference: PropTypes.string,
  responsive: PropTypes.bool,
};

export default ReactContent;
