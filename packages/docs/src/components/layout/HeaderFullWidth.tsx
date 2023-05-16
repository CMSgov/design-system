import React from 'react';
import CMSLogoIcon from '../icons/CMSLogo';
import SearchForm from '../content/SearchForm';

const HeaderFullWidth = () => {
  return (
    <div
      id="header-full-width"
      className="ds-l-row ds-u-margin--0 ds-u-padding--2 ds-u-padding-left--0 ds-u-border-bottom--2 ds-u-display--none ds-u-md-display--flex"
    >
      <a
        className="ds-u-display--flex ds-l-col--6 ds-u-align-items--center ds-u-padding-left--0"
        href="/"
        title="Return to the homepage"
      >
        <CMSLogoIcon />
        <h1 className="ds-u-padding-left--1 ds-text-heading--2xl ds-u-margin--0">Design System</h1>
      </a>
      <SearchForm className="ds-u-display--flex ds-l-col--6 ds-u-align-items--center ds-u-justify-content--end" />
    </div>
  );
};

export default HeaderFullWidth;
