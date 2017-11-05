import PropTypes from 'prop-types';
import React from 'react';
import ReactExample from './ReactExample';
import ReactPropDocs from './ReactPropDocs';
import componentPathFromSource from '../shared/componentPathFromSource';
const reactDoc = require('../../data/react-doc.json');

/**
 * If a React component's props documentation or example is available,
 * this component will return whatever is present.
 */
function ReactContent(props) {
  if (!props.reactComponent && !props.reactExample) return null;
  const content = [];
  let doc;
  let docs;
  let path;

  if (props.reactComponent) {
    path = componentPathFromSource(props.source.path, props.reactComponent);
    docs = reactDoc[`${path}.jsx`];
    // There should only ever be one exported component definition
    doc = docs && docs.length ? docs[0] : null;
  }

  if (doc && doc.description) {
    content.push(
      <div
        className="c-details ds-u-margin-y--2 ds-u-measure--wide"
        dangerouslySetInnerHTML={{ __html: doc.description }}
        key="description"
      />
    );
  }

  if (!props.hideExample) {
    const examplePath = props.reactExample
      ? componentPathFromSource(props.source.path, props.reactExample)
      : path;

    content.push(<ReactExample key="example" path={examplePath} />);
  }

  if (doc && doc.props) {
    content.push(<ReactPropDocs key="propDocs" propDocs={doc.props} />);
  }

  return content;
}

ReactContent.propTypes = {
  hideExample: PropTypes.bool,
  reactComponent: PropTypes.string,
  reactExample: PropTypes.string,
  source: PropTypes.shape({
    filename: PropTypes.string,
    path: PropTypes.string.isRequired
  })
};

export default ReactContent;
