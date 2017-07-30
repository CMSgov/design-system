import React from 'react';

const Header = () => {
  const rootPath = process.env.root ? `/${process.env.root}` : '/';

  return (
    <header className='ds-base--inverse ds-u-padding--3'>
      <h1 className='ds-h3'>
        <a href={rootPath} className='c-header__title' title='Home'>
          CMSGov Design System
        </a>
      </h1>
    </header>
  );
};

export default Header;
