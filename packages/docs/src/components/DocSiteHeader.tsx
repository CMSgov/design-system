import React from 'react';
import { UsaBanner } from '@cmsgov/design-system';
import GithubLinks from './GithubLinks';

const DocSiteHeader = () => {
  return (
    <div className="c-header">
      <UsaBanner />
      <header className="c-header__wrapper ds-u-padding--3 ds-u-md-display--flex ds-u-justify-content--between ds-u-align-items--center">
        <h1 className="c-header__title ds-h3 ds-u-margin-bottom--0">
          <a href="/" className="c-header__link">
            CMS Design System
          </a>
        </h1>
        <div className="ds-u-display--none ds-u-sm-display--block ds-u-md-display--flex ds-u-justify-content--end ds-u-sm-margin-top--1 ds-u-md-margin-top--0">
          <GithubLinks onDark />
        </div>
      </header>
    </div>
  );
};

export default DocSiteHeader;
