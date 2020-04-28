import PropTypes from 'prop-types';
import React from 'react';
import githubUrl from '../helpers/githubUrl';
import path from 'path';

const cmsdsGithubUrl = 'https://github.com/CMSgov/design-system';

const getBaseUrl = (filePath) => {
  if (filePath.match(/(design-system|design-system-docs)/i)) {
    return path.join(cmsdsGithubUrl, 'blob/master/packages/');
  } else {
    return githubUrl(`blob/master/`);
  }
};

const Source = (props) => {
  // This path is relative to the package directory
  // i.e. components/Button/Button.scss
  const filePath = props.reactComponentPath;
  const baseUrl = getBaseUrl(filePath);

  if (filePath && baseUrl) {
    const href = path.join(baseUrl, filePath);
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
};

export default Source;
