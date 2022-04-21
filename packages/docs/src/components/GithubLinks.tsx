import React from 'react';
import { Button } from '@cmsgov/design-system';
import classnames from 'classnames';

interface GithubLinks {
  /**
   * Describes if the links are on a dark background
   */
  onDark?: boolean;
}

/**
 * GithubLinks - a reusable component for Github links for downloading code & the Github repo
 */
const GithubLinks = ({ onDark }: GithubLinks) => {
  return (
    <>
      <Button
        href={`https://github.com/CMSgov/design-system/releases/latest/download/cmsgov-design-system-${process.env.GATSBY_CORE_PKG_VERSION}.tgz`}
        className="ds-c-button ds-c-button--primary ds-c-button--inverse ds-u-font-weight--normal"
      >
        {' '}
        Download Code{' '}
      </Button>
      <Button
        href="https://github.com/CMSgov/design-system"
        className={classnames('ds-c-button ds-u-font-weight--normal', {
          'ds-c-button--inverse': onDark,
        })}
      >
        View on GitHub
      </Button>
    </>
  );
};

export default GithubLinks;
