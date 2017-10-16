import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import githubUrl from '../shared/githubUrl';
import pkg from '../../../package.json';

const zipUrl = githubUrl(`archive/v${pkg.version}.zip`);

const GitHubLinks = props => {
  const downloadBtnClassName = classNames(
    'ds-c-button ds-c-button--primary ds-u-font-weight--normal',
    {
      'ds-u-display--block': props.vertical
    }
  );
  const githubBtnClassName = classNames(
    'ds-c-button ds-u-font-weight--normal',
    {
      'ds-u-margin-left--2': !props.vertical,
      'ds-u-margin-top--2 ds-u-display--block': props.vertical,
      'ds-c-button--inverse': props.inverse
    }
  );
  return (
    <div className={props.className}>
      <a href={zipUrl} className={downloadBtnClassName}>
        Download code and design files
      </a>
      <a href={githubUrl()} className={githubBtnClassName}>
        View on GitHub
      </a>
    </div>
  );
};

GitHubLinks.propTypes = {
  className: PropTypes.string,
  inverse: PropTypes.bool,
  vertical: PropTypes.bool
};

export default GitHubLinks;
