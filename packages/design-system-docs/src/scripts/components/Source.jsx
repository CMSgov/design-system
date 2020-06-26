import PropTypes from 'prop-types';
import React from 'react';
import githubUrl from '../helpers/githubUrl';
import join from 'url-join';

const cmsdsGithubUrl = 'https://github.com/CMSgov/design-system';

const getBaseUrl = (filePath) => {
  if (filePath.match(/(design-system|design-system-docs)/i)) {
    // File source originates from core CMSDS, path is relative to `package` directory
    // i.e. design-system/src/scripts/components/Button/Button.jsx
    return join(cmsdsGithubUrl, 'blob/master/packages/');
  } else {
    // File source from child DS, path relative to the repo root
    return githubUrl(`blob/master/`);
  }
};

const Source = (props) => {
  const baseUrl = getBaseUrl(props.reactComponentPath);

  if (baseUrl) {
    const href = join(baseUrl, props.reactComponentPath);
    return (
      <a
        className={props.className}
        href={href}
        title={`View source of ${props.reactComponentPath}`}
      >
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
