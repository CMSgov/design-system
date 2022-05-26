import { Button, CloseIconThin, MenuIcon, TFunction } from '@cmsgov/design-system';
import React, { SyntheticEvent } from 'react';
import classnames from 'classnames';
import { sendHeaderEvent } from './analytics';

const menuId = 'hc-c-menu';

export interface LinkProps {
  href: string;
  label: React.ReactNode;
  onClick?: (event: SyntheticEvent) => any;
}

export interface ActionMenuProps {
  t: TFunction;
  /** Applies the inverse theme styling */
  firstName?: string;
  loggedIn?: boolean;
  onMenuToggleClick: (event: SyntheticEvent) => any;
  /**
   * Indicates the menu is open, which influences the label
   * and ARIA attribute of the toggle button.
   */
  open?: boolean;
  /**
   * These are the links that are visible in the upper left when there
   * is no menu button present. Currently, these only show up when the
   * user is logged out
   */
  links: LinkProps[];
}

/**
 * ActionMenu is displayed at the top-right of the header.
 * There are two variations of this component: One for logged-out
 * users, which displays a "Log in" & "Espanol" link on desktop.
 * And another for logged-in users, which includes the user's first
 * name. The logged-in variation always displays a "Menu" toggle
 * button, and the logged-out variation only displays it on mobile.
 */
const ActionMenu = function (props: ActionMenuProps) {
  function onClick(event) {
    sendHeaderEvent(props.open ? 'menu closed' : 'menu opened');
    props.onMenuToggleClick(event);
  }

  const menuButton = (
    <Button
      aria-controls={menuId}
      aria-expanded={!!props.open}
      aria-label={props.open ? props.t('header.closeMenu') : props.t('header.openMenu')}
      className={classnames('hc-c-action-menu-button', 'ds-u-sm-margin-left--2', {
        'ds-u-display--inline-block ds-u-sm-display--none': !props.loggedIn,
      })}
      onClick={onClick}
      size="small"
    >
      {props.open ? (
        <CloseIconThin className="ds-u-margin-right--1" />
      ) : (
        <MenuIcon className="ds-u-margin-right--1" />
      )}
      {props.t('header.menu')}
    </Button>
  );

  let content;
  if (props.loggedIn) {
    content = (
      <>
        {props.firstName && (
          <span className="ds-u-display--none ds-u-sm-display--inline-block">
            {props.firstName}
          </span>
        )}
        {menuButton}
      </>
    );
  } else if (props.links.length) {
    content = (
      <>
        <ul className="hc-c-logged-out-links ds-c-list--bare ds-u-display--none ds-u-sm-display--flex">
          {props.links.map((link) => {
            return (
              <li key={link.href} className="hc-c-logged-out-links__li">
                <a
                  href={link.href}
                  // TODO: .toString() here pacifies TypeScript, but TypeScript has actually found a
                  // potential bug here where we allow link.label to be a ReactNode, but a ReactNode
                  // can't actually be coerced into a string. We've had to do a lot of extra work in
                  // other cases to find the text content of a ReactNode after rendering, like in
                  // packages/design-system/src/components/Alert/Alert.tsx#L114
                  onClick={() => sendHeaderEvent(link.label.toString(), link.href)}
                  className="hc-c-logged-out-links__link"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        {menuButton}
      </>
    );
  } else {
    content = null;
  }

  return content;
};

export default ActionMenu;
