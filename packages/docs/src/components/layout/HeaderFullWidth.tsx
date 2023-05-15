import React from 'react';
import CMSLogoIcon from '../icons/CMSLogo';
import SearchForm from '../content/SearchForm';

const HeaderFullWidth = () => {
  return (
    <div className="ds-l-row ds-u-margin--0 ds-u-padding--2 ds-u-padding-left--0 ds-u-border-bottom--2">
      <div className="ds-u-display--flex ds-l-col--6 ds-u-align-items--center ds-u-padding-left--0">
        <CMSLogoIcon />
        <h1 className="ds-u-padding-left--1 ds-text-heading--2xl ds-u-margin--0">Design System</h1>
      </div>
      <SearchForm className="ds-u-display--flex ds-l-col--6 ds-u-align-items--center ds-u-justify-content--end" />
    </div>
  );
};

export default HeaderFullWidth;
