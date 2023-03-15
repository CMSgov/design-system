import ActionMenu from './ActionMenu';
import DeConsumerMessage from './DeConsumerMessage';
import Logo from '../Logo/Logo';
import Menu from './Menu';
import React, { useState } from 'react';
import { SkipNav } from '@cmsgov/design-system';
import { t } from '../i18n';
import classnames from 'classnames';
import defaultMenuLinks from './defaultMenuLinks';

export interface Link {
  href: string;
  label: React.ReactNode;
  ariaLabel: string;
  className?: string;
  onClick?: (...args: any[]) => any;
}

export interface HeaderProps {
  /**
   * Additional classes to be added to the root `<header>` element.
   */
  className?: string;
  /**
   * For applications that handle their own locale switching. Overrides the
   * default locale link. This takes precedence over the `subpath` prop.
   */
  switchLocaleLink?: string;
  /**
   * Indicate that a user is logged-in.
   */
  loggedIn?: boolean;
  /**
   * When set to true, do not display the Login text in the upper right of the
   * header
   */
  hideLoginLink?: boolean;
  /**
   * When set to true, even if logged in the Logout link will not render
   */
  hideLogoutLink?: boolean;
  /**
   * When set to true, do not display the the switch locale link
   */
  hideLanguageSwitch?: boolean;
  /**
   * For logged-in users, pass in their first name to display in the header
   */
  firstName?: string;
  /**
   * For applications hosted at paths other than the root `healthcare.gov`/
   * `cuidadodesalud.gov`. This string will be appended to the end of the
   * language links so as to keep the user within the same part of the site
   * when switching languages.
   */
  subpath?: string;
  /**
   * The primary, or root domain where the majority of header links should be
   * hosted.  By default, links render with relative paths, but providing this
   * prop will force all links to render with absolute paths based on the
   * provided string. The string should include the protocol (`http://` or
   * `https://`) and the domain only, with no trailing slash. For example, if
   * the provided string is `https://test.healthcare.gov`, the login link will
   * render as `https://test.healthcare.gov/login` instead of just `/login`.
   * Note that this is only really necessary if your application is hosted on a
   * subdomain, such as `https://localhelp.healthcare.gov`, where relative links
   * would direct the user to the wrong location, e.g. the link to `/login`
   * would incorrectly direct the user to
   * `https://localhelp.healthcare.gov/login` when it should direct the user to
   * `https://healthcare.gov/login`.
   */
  primaryDomain?: string;
  /**
   * A URL hash used for the "Skip to main content" link. This is
   * typically the `id` of your "main" content area (ie. `#main`).
   */
  skipNavHref?: string;
  /**
   * An onClick handler used for the "Skip to main content" link. This can
   * be used in cases where one would need to manually set the focus on the
   * content area (e.g. where hash routing is being used).
   */
  onSkipNavClick?: (...args: any[]) => any;
  /**
   * Indicates when a consumer is coming from a Direct Enrollment flow.
   * This will include additional messaging and modify some of the links.
   */
  deConsumer?: boolean;
  /**
   * Used in conjunction with `deConsumer`, the Direct Enrollment broker's
   * name is used in some of the messaging displayed to the consumer.
   */
  deBrokerName?: string;
  /**
   * Optionally pass in an array of link objects to override the default
   * set of menu links. This may be useful if you need to customize the
   * links on a page-by-page basis. To reference the default set of menu
   * links, you can import the `defaultMenuLinks` method.
   */
  links?: Link[];
  /**
   * Optionally pass a React component to render within the menu. Useful for
   * when you need more control over what appears in the menu than what's
   * provided by the `links` prop, e.g. a search input. Will appear *above* any
   * links provided by the `defaultMenuLinks` method or the links provided by
   * the `links` prop.
   */
  submenuTop?: React.ReactNode;
  /**
   * Same as `submenuTop`, except it will appear *below* any links provided by
   * the `defaultMenuLinks` method or the links provided by the `links` prop.
   */
  submenuBottom?: React.ReactNode;
  /**
   * Element added to display content on Header bottom section
   */
  headerBottom?: React.ReactNode;
  /**
   * Open and handler function for fully controlled menu behavior
   */
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
  /**
   * Additional classes to be added to the Logo component
   */
  logoClassName?: string;
}

export const VARIATION_NAMES = {
  LOGGED_IN: 'logged-in',
  LOGGED_OUT: 'logged-out',
};

/**
 * The top-level component, responsible for maintaining the
 * header's state (like whether the mobile menu is expanded) and
 * determining which variation of the header to display
 */
export const Header = (props: HeaderProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const isControlledMenu = props.isMenuOpen !== undefined && props.onMenuToggle !== undefined;

  /**
   * Determines which variation of the header should be displayed,
   * based on the props being passed into the component.
   * @returns {String} Variation name
   */
  function variation(): string {
    if (props.loggedIn) {
      // Logged-in state, with minimal navigation
      return VARIATION_NAMES.LOGGED_IN;
    } else {
      // Logged-out state, either Learn or Product
      return VARIATION_NAMES.LOGGED_OUT;
    }
  }

  function isLoggedIn() {
    return variation() === VARIATION_NAMES.LOGGED_IN;
  }

  /**
   * Content rendered within <Menu>, before the list of links
   * @returns {Node}
   */
  function beforeMenuLinks(): JSX.Element {
    if (isLoggedIn() && props.firstName) {
      return (
        <div className="ds-u-sm-display--none ds-u-border-bottom--1 ds-u-margin-x--1 ds-u-padding-y--1 hc-c-header__name">
          {props.firstName}
        </div>
      );
    }
  }

  /**
   * Event handler for when the "Menu" or "Close" button
   * within ActionMenu is clicked.
   */
  function handleMenuToggleClick() {
    if (!isControlledMenu) {
      setOpenMenu(!openMenu);
    } else {
      props.onMenuToggle();
    }
  }

  const classes = classnames(`hc-c-header hc-c-header--${variation()}`, props.className);

  const hasCustomLinks = !!props.links;
  const defaultLinksForVariation = defaultMenuLinks({
    deConsumer: props.deConsumer,
    subpath: props.subpath,
    primaryDomain: props.primaryDomain,
    switchLocaleLink: props.switchLocaleLink,
    hideLoginLink: props.hideLoginLink,
    hideLogoutLink: props.hideLogoutLink,
    hideLanguageSwitch: props.hideLanguageSwitch,
    customLinksPassedIn: hasCustomLinks,
  })[variation()];

  const links = hasCustomLinks
    ? props.links.concat(defaultLinksForVariation)
    : defaultLinksForVariation;

  return (
    <header className={classes} role="banner" aria-label="global">
      <SkipNav href={props.skipNavHref} onClick={props.onSkipNavClick}>
        {t('header.skipNav')}
      </SkipNav>

      <div className="ds-l-container">
        <div className="ds-l-row ds-u-align-items--center ds-u-flex-wrap--nowrap ds-u-padding-y--2">
          <a
            href={props.primaryDomain ? props.primaryDomain : '/'}
            className="hc-c-logo-link ds-l-col ds-l-col--auto"
          >
            <Logo className={props.logoClassName ?? ''} />
          </a>

          <nav
            aria-label="Profile, applications, and coverage"
            id="hc-c-header__actions"
            className="hc-c-header__actions ds-l-col ds-l-col--auto ds-u-margin-left--auto ds-u-font-weight--bold"
          >
            <ActionMenu
              t={t}
              firstName={props.firstName}
              onMenuToggleClick={handleMenuToggleClick}
              loggedIn={props.loggedIn}
              open={isControlledMenu ? props.isMenuOpen : openMenu}
              links={links}
            />
            <Menu
              beforeLinks={beforeMenuLinks()}
              links={links}
              open={isControlledMenu ? props.isMenuOpen : openMenu}
              submenuTop={props.submenuTop}
              submenuBottom={props.submenuBottom}
            />
          </nav>
        </div>
      </div>

      {props.deConsumer && <DeConsumerMessage t={t} deBrokerName={props.deBrokerName} />}
      {props.headerBottom}
    </header>
  );
};

Header.defaultProps = {
  skipNavHref: '#main',
};

export default Header;
