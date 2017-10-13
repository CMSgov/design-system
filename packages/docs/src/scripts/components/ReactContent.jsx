import PropTypes from 'prop-types';
import React from 'react';
import ReactExample from './ReactExample';
import ReactPropDocs from './ReactPropDocs';
import reactComponentPath from '../shared/reactComponentPath';
const reactDoc = require('../../data/react-doc.json');

/**
 * If a React component's props documentation or example is available,
 * this component will return whatever is present.
 */
function ReactContent(props) {
  if (!props.reactComponent) return null;
  const path = reactComponentPath(props.source.path, props.reactComponent);
  const docs = reactDoc[`${path}.jsx`];
  // There should only ever be one exported component definition
  const doc = (docs && docs.length) ? docs[0] : null;

  return (
    <div>
      {doc &&
        <div
          className='c-details ds-u-margin-y--2 ds-u-measure--wide'
          dangerouslySetInnerHTML={{__html: doc.description}}
        />
      }
      {!props.hideExample && <ReactExample path={path} />}
      {doc && <ReactPropDocs propDocs={doc.props} />}
    </div>
  );
}

ReactContent.propTypes = {
  hideExample: PropTypes.bool,
  reactComponent: PropTypes.string,
  source: PropTypes.shape({
    filename: PropTypes.string,
    path: PropTypes.string.isRequired
  })
};

export default ReactContent;
