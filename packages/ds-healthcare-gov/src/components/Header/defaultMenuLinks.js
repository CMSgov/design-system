import { VARIATION_NAMES } from './Header';
import localeLink from './localeLink';
import loginLink from './loginLink';
import { translate } from '../i18n';

/**
 * Default menu links for each header variation.
 * Apps can import this method into their app if they need to
 * extend the existing default list of menu links.
 * @param {Function} translate - i18n translator
 * @param {String} locale
 * @param {Boolean} deConsumer
 * @param {String} subpath
 * @param {String} primaryDomain
 * @param {String} switchLocaleLink
 * @param {boolean} hideLoginLink
 * @param {boolean} hideLanguageSwitch
 * @param {boolean} customLinksPassedIn
 * @returns {Object}
 */
export function defaultMenuLinks(
  locale = 'en',
  deConsumer,
  subpath,
  primaryDomain = '',
  switchLocaleLink,
  hideLoginLink,
  hideLogoutLink,
  hideLanguageSwitch,
  customLinksPassedIn
) {
  const isSpanish = locale === 'es';
  const ffmLocalePath = isSpanish ? 'es_MX' : 'en_US';
  // We import and set i18n options within this method, for
  // scenarios where an app needs to import this method and
  // extend the existing list of default links
  const t = translate;
  const i18nOptions = { lng: locale };

  // NOTE: order matters here and links will be displayed in order added to the arrays
  const loggedOut = [];
  const loggedIn = [];

  // Links other than the ones inside this if should need to be explicitly hidden for their
  // respective variations. This means the language and login will show even if a custom set
  // of links is passed in.
  if (!customLinksPassedIn) {
    loggedIn.push({
      label: t('header.myApplicationsAndCoverage', i18nOptions),
      href: `${primaryDomain}/marketplace/auth/global/${ffmLocalePath}/myProfile#landingPage`,
    });
    loggedIn.push({
      label: t('header.myProfile', i18nOptions),
      href: `${primaryDomain}/marketplace/auth/global/${ffmLocalePath}/myProfile#settings`,
    });
  }

  if (!hideLanguageSwitch) {
    const locLink = localeLink(t, locale, subpath, switchLocaleLink);
    loggedOut.push(locLink);
    loggedIn.push(locLink);
  }

  if (!hideLoginLink) {
    const logLink = loginLink(t, deConsumer, primaryDomain);
    loggedOut.push(Object.assign({ identifier: LINK_IDENTIFIERS.LOGIN }, logLink));
  }

  if (!hideLogoutLink) {
    loggedIn.push({
      identifier: LINK_IDENTIFIERS.LOGOUT,
      label: t('header.logout', i18nOptions),
      href: `${primaryDomain || ''}/logout`,
    });
  }

  const links = {};
  links[VARIATION_NAMES.LOGGED_OUT] = loggedOut;
  links[VARIATION_NAMES.LOGGED_IN] = loggedIn;

  return links;
}

export const LINK_IDENTIFIERS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
};

export default defaultMenuLinks;
