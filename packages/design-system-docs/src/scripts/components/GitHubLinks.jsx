import { Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import githubUrl from '../helpers/githubUrl';
import pkg from '../../../package.json';

// TODO: Replace with link to self hosted download
const zipUrl = githubUrl(
  `releases/download/${pkg.version}/cmsgov-design-system-${pkg.version}.tgz`
);
const GitHubLinks = (props) => {
  const downloadBtnClassName = classNames('ds-u-font-weight--normal', {
    'ds-u-display--block': props.vertical,
  });
  const githubBtnClassName = classNames('ds-u-font-weight--normal', {
    'ds-u-margin-left--2': !props.vertical,
    'ds-u-margin-top--2 ds-u-display--block': props.vertical,
  });
  return (
    <div className={props.className}>
      <Button
        href={zipUrl}
        inversed={props.inversed}
        variation="primary"
        className={downloadBtnClassName}
      >
        Download code and design files
      </Button>
      <Button href={githubUrl()} inversed={props.inversed} className={githubBtnClassName}>
        View on GitHub
      </Button>
    </div>
  );
};

GitHubLinks.propTypes = {
  className: PropTypes.string,
  inversed: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default GitHubLinks;
