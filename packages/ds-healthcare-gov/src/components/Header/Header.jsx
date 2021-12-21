import ActionMenu from './ActionMenu';
import DeConsumerMessage from './DeConsumerMessage';
import Logo from '../Logo/Logo';
import Menu from './Menu';
import PropTypes from 'prop-types';
import React from 'react';
import { SkipNav } from '@cmsgov/design-system';
import classnames from 'classnames';
import defaultMenuLinks from './defaultMenuLinks';
import { withTranslation } from 'react-i18next';

export const VARIATION_NAMES = {
  LOGGED_IN: 'logged-in',
  LOGGED_OUT: 'logged-out',
};

/**
 * The top-level component, responsible for maintaining the
 * header's state (like whether the mobile menu is expanded) and
 * determining which variation of the header to display
 */
export class _Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false,
    };
  }

  isLoggedIn() {
    return this.variation() === VARIATION_NAMES.LOGGED_IN;
  }

  /**
   * Content rendered within <Menu>, before the list of links
   * @returns {Node}
   */
  beforeMenuLinks() {
    if (this.isLoggedIn() && this.props.firstName) {
      return (
        <div className="ds-u-sm-display--none ds-u-border-bottom--1 ds-u-margin-x--1 ds-u-padding-y--1 hc-c-header__name">
          {this.props.firstName}
        </div>
      );
    }
  }

  /**
   * Event handler for when the "Menu" or "Close" button
   * within ActionMenu is clicked.
   */
  handleMenuToggleClick = () => {
    this.setState({ openMenu: !this.state.openMenu });
  };

  /**
   * Determines which variation of the header should be displayed,
   * based on the props being passed into the component.
   * @returns {String} Variation name
   */
  variation() {
    if (this.props.loggedIn) {
      // Logged-in state, with minimal navigation
      return VARIATION_NAMES.LOGGED_IN;
    } else {
      // Logged-out state, either Learn or Product
      return VARIATION_NAMES.LOGGED_OUT;
    }
  }

  render() {
    const classes = classnames(
      `hc-c-header hc-c-header--${this.variation()}`,
      this.props.className
    );

    const hasCustomLinks = !!this.props.links;
    const defaultLinksForVariation = defaultMenuLinks(
      this.props.initialLanguage,
      this.props.deConsumer,
      this.props.subpath,
      this.props.primaryDomain,
      this.props.switchLocaleLink,
      this.props.hideLoginLink,
      this.props.hideLogoutLink,
      this.props.hideLanguageSwitch,
      hasCustomLinks
    )[this.variation()];

    const links = hasCustomLinks
      ? this.props.links.concat(defaultLinksForVariation)
      : defaultLinksForVariation;

    return (
      <header className={classes} role="banner">
        <SkipNav href={this.props.skipNavHref} onClick={this.props.onSkipNavClick}>
          {this.props.t('header.skipNav')}
        </SkipNav>

        <div className="ds-l-container">
          <div className="ds-l-row ds-u-align-items--center ds-u-flex-wrap--nowrap ds-u-padding-y--2">
            <a
              href={this.props.primaryDomain ? this.props.primaryDomain : '/'}
              className="hc-c-logo-link ds-l-col ds-l-col--auto"
            >
              <Logo locale={this.props.initialLanguage} />
            </a>

            <ActionMenu
              firstName={this.props.firstName}
              onMenuToggleClick={this.handleMenuToggleClick}
              locale={this.props.initialLanguage}
              loggedIn={this.props.loggedIn}
              open={this.state.openMenu}
              links={links}
            />
          </div>
        </div>

        <Menu
          beforeLinks={this.beforeMenuLinks()}
          links={links}
          open={this.state.openMenu}
          primaryDomain={this.props.primaryDomain}
          submenuTop={this.props.submenuTop}
          submenuBottom={this.props.submenuBottom}
        />

        {this.props.deConsumer && <DeConsumerMessage deBrokerName={this.props.deBrokerName} />}
        {this.props.headerBottom}
      </header>
    );
  }
}

_Header.defaultProps = {
  initialLanguage: 'en',
  skipNavHref: '#main',
};

/* eslint-disable react/no-unused-prop-types */
_Header.propTypes = {
  /**
   * Additional classes to be added to the root `<header>` element.
   */
  className: PropTypes.string,
  /**
   * The language the header will render as.
   */
  initialLanguage: PropTypes.oneOf(['en', 'es']),
  /**
   * For applications that handle their own locale switching. Overrides the
   * default locale link. The link's label is still determined by the opposite
   * of the `initialLanguage` provided, i.e. if `initialLanguage` is `en`,
   * the link's label will always be "Español". This takes precedence over the
   * `subpath` prop.
   */
  switchLocaleLink: PropTypes.string,
  /**
   * Indicate that a user is logged-in.
   */
  loggedIn: PropTypes.bool,
  /**
   * When set to true, do not display the Login text in the upper right of the
   * header
   */
  hideLoginLink: PropTypes.bool,
  /**
   * When set to true, even if logged in the Logout link will not render
   */
  hideLogoutLink: PropTypes.bool,
  /**
   * When set to true, do not display the the switch locale link
   */
  hideLanguageSwitch: PropTypes.bool,
  /**
   * For logged-in users, pass in their first name to display in the header
   */
  firstName: PropTypes.node,
  /**
   * For applications hosted at paths other than the root `healthcare.gov`/
   * `cuidadodesalud.gov`. This string will be appended to the end of the
   * language links so as to keep the user within the same part of the site
   * when switching languages.
   */
  subpath: PropTypes.string,
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
  primaryDomain: PropTypes.string,
  /**
   * A URL hash used for the "Skip to main content" link. This is
   * typically the `id` of your "main" content area (ie. `#main`).
   */
  skipNavHref: PropTypes.string,
  /**
   * An onClick handler used for the "Skip to main content" link. This can
   * be used in cases where one would need to manually set the focus on the
   * content area (e.g. where hash routing is being used).
   */
  onSkipNavClick: PropTypes.func,
  /**
   * Indicates when a consumer is coming from a Direct Enrollment flow.
   * This will include additional messaging and modify some of the links.
   */
  deConsumer: PropTypes.bool,
  /**
   * Used in conjunction with `deConsumer`, the Direct Enrollment broker's
   * name is used in some of the messaging displayed to the consumer.
   */
  deBrokerName: PropTypes.string,
  /**
   * Optionally pass in an array of link objects to override the default
   * set of menu links. This may be useful if you need to customize the
   * links on a page-by-page basis. To reference the default set of menu
   * links, you can import the `defaultMenuLinks` method.
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
    })
  ),
  /**
   * Optionally pass a React component to render within the menu. Useful for
   * when you need more control over what appears in the menu than what's
   * provided by the `links` prop, e.g. a search input. Will appear *above* any
   * links provided by the `defaultMenuLinks` method or the links provided by
   * the `links` prop.
   */
  submenuTop: PropTypes.node,
  /**
   * Same as `submenuTop`, except it will appear *below* any links provided by
   * the `defaultMenuLinks` method or the links provided by the `links` prop.
   */
  submenuBottom: PropTypes.node,
  /**
   * Element added to display content on Header bottom section
   */
  headerBottom: PropTypes.node,
};

export const Header = withTranslation()(_Header);
export default Header;
