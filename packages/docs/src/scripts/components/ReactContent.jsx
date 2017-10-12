import PropTypes from 'prop-types';
import React from 'react';
import ReactComponentDoc from './ReactComponentDoc';
import reactComponentPath from '../shared/reactComponentPath';
const reactDoc = require('../../data/react-doc.json');

/**
 * If a React component's props documentation or example is available,
 * this component will return whatever is present.
 */
class ReactContent extends React.PureComponent {
  render() {
    if (!this.props.reactComponent) return null;
    const path = reactComponentPath(this.props.source.path, this.props.reactComponent);
    const docs = reactDoc[`${path}.jsx`];

    if (docs && docs.length) {
      // There should only ever be one exported component definition
      const doc = docs[0];

      return (
        <ReactComponentDoc
          description={doc.description}
          displayName={doc.displayName}
          hideExample={this.props.hideExample}
          path={path}
          propDocs={doc.props}
        />
      );
    }

    return null;
  }
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
