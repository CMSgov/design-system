import GitHubLinks from './GitHubLinks';
import React from 'react';

const Header = () => {
  return (
    <header className='ds-base--inverse ds-u-padding--3 ds-u-display--flex ds-u-justify-content--between ds-u-align-items--center'>
      <h1 className='ds-h3 ds-u-margin-bottom--0'>CMS.gov Design System</h1>
      <GitHubLinks className='ds-u-display--none ds-u-md-display--block' inverse />
    </header>
  );
};

export default Header;
