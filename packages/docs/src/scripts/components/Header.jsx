import React from 'react';

const Header = () => {
  return (
    <header className='ds-base--inverse'>
      <div className='ds-u-fill--warn-lightest ds-base ds-u-padding-x--3 ds-u-padding-y--1 ds-u-font-size--small'>
        <strong>Alpha status</strong>:
        The design system is under active development and working towards a 1.0 release.
      </div>
      <div className='ds-u-padding--3'>
        <h1 className='ds-h3'>CMS.gov Design System</h1>
      </div>
    </header>
  );
};

export default Header;
