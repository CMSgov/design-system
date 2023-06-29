import React, { useState } from 'react';
import classnames from 'classnames';
import { Button, CloseIconThin, MenuIconThin, UsaBanner } from '@cmsgov/design-system';
import { SITE_TITLE } from '../../../../consts';

interface Props {
  children: React.ReactNode;
}

const MobileMenuWrapper = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classnames('c-navigation', isOpen && 'c-navigation--open')}>
      <UsaBanner className="ds-u-display--block ds-u-md-display--none" />
      <header className="c-navigation__header ds-u-md-display--block ds-u-md-display--none">
        <Button
          className="ds-u-md-display--none ds-u-padding-left--0 ds-u-padding-right--1"
          variation="ghost"
          aria-expanded={isOpen}
          aria-controls="c-navigation__menu"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <CloseIconThin className="ds-u-font-size--xl" />
          ) : (
            <MenuIconThin className="ds-u-font-size--xl" />
          )}
        </Button>
        <div>
          <a className="c-navigation__title" href="/">
            {SITE_TITLE}
          </a>
        </div>
      </header>

      <div id="c-navigation__menu" className="c-navigation__menu">
        {children}
      </div>
    </div>
  );
};

export default MobileMenuWrapper;
