/* eslint-disable react/no-multi-comp, jsx-a11y/no-redundant-roles */
import { Button, CloseIconThin, MenuIcon } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { sendHeaderEvent } from './analytics';
import { withTranslation } from 'react-i18next';

const menuId = 'hc-c-menu';

/**
 * ActionMenu is displayed at the top-right of the header.
 * There are two variations of this component: One for logged-out
 * users, which displays a "Log in" & "Espanol" link on desktop.
 * And another for logged-in users, which includes the user's first
 * name. The logged-in variation always displays a "Menu" toggle
 * button, and the logged-out variation only displays it on mobile.
 */
const ActionMenu = function (props) {
  return (
    <nav
      id="hc-c-header__actions"
      className="hc-c-header__actions ds-l-col ds-l-col--auto ds-u-margin-left--auto ds-u-font-weight--bold"
      role="navigation"
    >
      {props.loggedIn ? <LoggedInActionMenu {...props} /> : <LoggedOutActionMenu {...props} />}
    </nav>
  );
};

function LoggedInActionMenu(props) {
  return (
    <div>
      {props.firstName && (
        <span className="ds-u-display--none ds-u-sm-display--inline-block">{props.firstName}</span>
      )}
      <MenuButton {...props} />
    </div>
  );
}

function LoggedOutActionMenu(props) {
  if (props.links.length <= 0) return <></>;

  return (
    <div>
      <ul className="hc-c-logged-out-links ds-c-list--bare ds-u-display--none ds-u-sm-display--inline-block">
        {props.links.map((link) => {
          return (
            <li key={link.href} className="hc-c-logged-out-links__li">
              <a
                href={link.href}
                onClick={() => sendHeaderEvent(link.label, link.href)}
                className="hc-c-logged-out-links__link"
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
      <MenuButton {...props} className="ds-u-display--inline-block ds-u-sm-display--none" />
    </div>
  );
}

function MenuButton({ t, open, ...props }) {
  const className = classnames(
    'hc-c-action-menu-button',
    'ds-u-sm-margin-left--2',
    props.className
  );

  function onClick(event) {
    sendHeaderEvent(open ? 'menu closed' : 'menu opened');
    props.onMenuToggleClick(event);
  }

  return (
    <Button
      aria-controls={menuId}
      aria-expanded={!!open}
      aria-label={open ? t('header.closeMenu') : t('header.openMenu')}
      className={className}
      onClick={onClick}
      size="small"
    >
      {open ? <CloseIconThin /> : <MenuIcon className="ds-u-margin-right--1" />}
      {t('header.menu')}
    </Button>
  );
}

ActionMenu.propTypes = {
  /** Applies the inverse theme styling */
  firstName: PropTypes.string,
  loggedIn: PropTypes.bool,
  onMenuToggleClick: PropTypes.func.isRequired,
  /**
   * Indicates the menu is open, which influences the label
   * and ARIA attribute of the toggle button.
   */
  open: PropTypes.bool,
  /**
   * These are the links that are visible in the upper left when there
   * is no menu button present. Currently, these only show up when the
   * user is logged out
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      identifier: PropTypes.string,
      href: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
};

LoggedInActionMenu.propTypes = {
  firstName: ActionMenu.propTypes.firstName,
  onMenuToggleClick: ActionMenu.propTypes.onMenuToggleClick,
  open: ActionMenu.propTypes.open,
};

LoggedOutActionMenu.propTypes = {
  onMenuToggleClick: ActionMenu.propTypes.onMenuToggleClick,
  open: ActionMenu.propTypes.open,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      identifier: PropTypes.string,
      href: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
};

MenuButton.propTypes = {
  onMenuToggleClick: ActionMenu.propTypes.onMenuToggleClick,
  open: ActionMenu.propTypes.open,
  className: PropTypes.string,
};

export default withTranslation()(ActionMenu);
