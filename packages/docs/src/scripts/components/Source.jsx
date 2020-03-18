import PropTypes from 'prop-types';
import React from 'react';
import githubUrl from '../helpers/githubUrl';

const cmsdsGithubUrl = 'https://github.com/CMSgov/design-system';

const markdownPattern = /\.md$/;
const packagesPattern = /packages\/([a-z-_]+)\//i;
const nodeModulesPattern = /node_modules\/@cmsgov\/([a-z-_]+)\//i;

const getBaseUrl = source => {
  // Only show the source link if this is React or CSS component
  if (!source || source.path.match(markdownPattern)) {
    return undefined;
  } else if (source.path.match(nodeModulesPattern)) {
    const packageName = source.path.match(nodeModulesPattern)[1];
    return `${cmsdsGithubUrl}/blob/master/packages/${packageName}/src`;
  } else if (source.path.match(packagesPattern)) {
    const packageName = source.path.match(packagesPattern)[1];
    return githubUrl(`blob/master/packages/${packageName}/src`);
  }
};

const Source = props => {
  const reactPath =
    props.reactComponentPath && props.reactComponentPath.replace(/[a-z-]+\/src\//, '');
  // This path is relative to the package directory
  // i.e. components/Button/Button.scss
  const filePath = reactPath || (props.source && props.source.filename);
  const baseUrl = getBaseUrl(props.source);

  if (baseUrl && filePath) {
    const href = `${baseUrl}/src/${filePath}`;
    return (
      <a className={props.className} href={href} title={`View source of ${filePath}`}>
        View source file
      </a>
    );
  }

  return null;
};

Source.propTypes = {
  className: PropTypes.string,
  reactComponentPath: PropTypes.string,
  source: PropTypes.shape({
    filename: PropTypes.string,
    path: PropTypes.string.isRequired
  })
};

export default Source;
