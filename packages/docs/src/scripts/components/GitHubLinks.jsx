import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import packageInfo from '../../../package.json';

const githubUrl = 'https://github.com/CMSgov/design-system';
const zipUrl = `${githubUrl}/archive/v${packageInfo.version}.zip`;

const GitHubLinks = (props) => {
  const downloadBtnClassName = classNames('ds-c-button ds-c-button--primary ds-c-button--small', {
    'ds-u-display--block': props.vertical
  });
  const githubBtnClassName = classNames('ds-c-button ds-c-button--small', {
    'ds-u-margin-left--2': !props.vertical,
    'ds-u-margin-top--2 ds-u-display--block': props.vertical,
    'ds-c-button--inverse': props.inverse
  });
  return (
    <div className={props.className}>
      <a href={zipUrl} className={downloadBtnClassName}>Download code and design files</a>
      <a href={githubUrl} className={githubBtnClassName}>View on Github</a>
    </div>
  );
};

GitHubLinks.propTypes = {
  inverse: PropTypes.bool,
  vertical: PropTypes.bool
};

export default GitHubLinks;
