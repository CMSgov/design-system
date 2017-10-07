import PropTypes from 'prop-types';
import React from 'react';
import githubUrl from '../shared/githubUrl';
import reactComponentPath from '../shared/reactComponentPath';

const Source = props => {
  // Only show the source link if this is for a non-theme React or CSS component
  if (
    !props.source.path.match(/packages\/themes\//) &&
    (props.reactComponent ||
      (props.source && !props.source.path.match(/\.md$/)))
  ) {
    const packageName = props.source.path.match(/packages\/([a-z-_]+)\//i)[1];
    const reactPath =
      props.reactComponent &&
      reactComponentPath(props.source.path, props.reactComponent).replace(
        /[a-z-]+\/src\//,
        ''
      );

    // This path is relative to the package directory
    // i.e. components/Button/Button.scss
    const path = props.reactComponent
      ? `${reactPath}.jsx`
      : props.source.filename;
    const githubBlobUrl = githubUrl(
      `blob/master/packages/${packageName}/src/${path}`
    );

    return (
      <a
        className={props.className}
        href={githubBlobUrl}
        title={`View source of ${path}`}
      >
        View source file
      </a>
    );
  }

  return null;
};

Source.propTypes = {
  className: PropTypes.string,
  reactComponent: PropTypes.string,
  source: PropTypes.shape({
    filename: PropTypes.string,
    path: PropTypes.string.isRequired
  })
};

export default Source;
