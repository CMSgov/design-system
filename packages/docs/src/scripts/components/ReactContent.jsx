import PropTypes from 'prop-types';
import React from 'react';
import ReactExample from './ReactExample';
import ReactPropDocs from './ReactPropDocs';

/**
 * If a React component's props documentation or example is available,
 * this component will return whatever is present.
 */
function ReactContent(props) {
  if (!props.reactComponentDocs && !props.reactExamplePath) return null;
  const content = [];

  if (props.reactComponentDocs && props.reactComponentDocs.description) {
    content.push(
      <div
        className="c-details ds-u-margin-y--2 ds-u-measure--wide"
        dangerouslySetInnerHTML={{
          __html: props.reactComponentDocs.description
        }}
        key="description"
      />
    );
  }

  if (!props.hideExample) {
    content.push(
      <ReactExample
        key="example"
        markup={props.reactExampleSource}
        path={props.reactExamplePath}
        reference={props.reference}
        responsive={props.responsive}
      />
    );
  }

  if (props.reactComponentDocs && props.reactComponentDocs.props) {
    content.push(
      <ReactPropDocs key="propDocs" propDocs={props.reactComponentDocs.props} />
    );
  }

  return content;
}

ReactContent.propTypes = {
  hideExample: PropTypes.bool,
  reactComponentDocs: PropTypes.shape({
    description: PropTypes.string,
    props: ReactPropDocs.propTypes.propDocs
  }),
  reactExamplePath: PropTypes.string,
  reactExampleSource: ReactExample.propTypes.markup,
  reference: PropTypes.string,
  responsive: PropTypes.bool
};

export default ReactContent;
