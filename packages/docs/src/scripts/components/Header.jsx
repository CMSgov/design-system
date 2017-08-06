import React from 'react';
import lerna from '../../../../../lerna.json';

const githubUrl = 'https://github.com/CMSgov/design-system';
const zipUrl = `${githubUrl}/archive/v${lerna.version}.zip`;

const Header = () => {
  return (
    <header className='ds-base--inverse ds-u-padding--3 ds-u-display--flex ds-u-justify-content--between ds-u-align-items--center'>
      <h1 className='ds-h3 ds-u-margin-bottom--0'>CMS.gov Design System</h1>
      <div className='ds-u-display--none ds-u-md-display--block'>
        <a href={zipUrl} className='ds-c-button ds-c-button--primary ds-c-button--small'>Download code and design files</a>
        <a href={githubUrl} className='ds-c-button ds-c-button--inverse ds-c-button--small ds-u-margin-left--2'>View on Github</a>
      </div>
    </header>
  );
};

export default Header;
