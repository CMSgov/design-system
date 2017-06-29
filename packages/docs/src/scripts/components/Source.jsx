import PropTypes from 'prop-types';
import React from 'react';
import reactComponentPath from '../shared/reactComponentPath';

const Source = props => {
  if (props.reactComponent || props.source) {
    const reactPath = props.reactComponent && reactComponentPath(props.source.path, props.reactComponent).replace(/[a-z-]+\/src\//, '');
    const path = props.reactComponent ? `${reactPath}.jsx` : props.source.filename;

    return <code className='ds-u-font-size--small'>{path}</code>;
  }

  return null;
};

Source.propTypes = {
  reactComponent: PropTypes.string,
  source: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })
};

export default Source;
