import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import githubUrl from '../shared/githubUrl';
import pkg from '../../../package.json';

const zipUrl = githubUrl(`releases/download/${pkg.version}/design-system-v${pkg.version}.zip`);

const GitHubLinks = props => {
  const downloadBtnClassName = classNames('ds-u-font-weight--normal', {
    'ds-u-display--block': props.vertical
  });
  const githubBtnClassName = classNames('ds-u-font-weight--normal', {
    'ds-u-margin-left--2': !props.vertical,
    'ds-u-margin-top--2 ds-u-display--block': props.vertical
  });
  return (
    <div className={props.className}>
      <Button
        href={zipUrl}
        inverse={props.inverse}
        variation="primary"
        className={downloadBtnClassName}
      >
        Download code and design files
      </Button>
      <Button href={githubUrl()} inverse={props.inverse} className={githubBtnClassName}>
        View on GitHub
      </Button>
    </div>
  );
};

GitHubLinks.propTypes = {
  className: PropTypes.string,
  inverse: PropTypes.bool,
  vertical: PropTypes.bool
};

export default GitHubLinks;
