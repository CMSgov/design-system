import { Language, Link, VARIATION_NAMES } from './Header';
import localeLink from './localeLink';
import loginLink from './loginLink';
import { TFunction } from 'i18next';

export enum LinkIdentifier {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

export interface DefaultLink extends Link {
  identifier?: LinkIdentifier;
}

/**
 * Default menu links for each header variation.
 * Apps can import this method into their app if they need to
 * extend the existing default list of menu links.
 */
export function defaultMenuLinks(
  t: TFunction,
  locale: Language = 'en',
  deConsumer?: boolean,
  subpath?: string,
  primaryDomain = '',
  switchLocaleLink?: string,
  hideLoginLink?: boolean,
  hideLogoutLink?: boolean,
  hideLanguageSwitch?: boolean,
  customLinksPassedIn?: boolean
) {
  const isSpanish = locale === 'es';
  const ffmLocalePath = isSpanish ? 'es_MX' : 'en_US';

  // NOTE: order matters here and links will be displayed in order added to the arrays
  const loggedOut = [];
  const loggedIn = [];

  // Links other than the ones inside this if should need to be explicitly hidden for their
  // respective variations. This means the language and login will show even if a custom set
  // of links is passed in.
  if (!customLinksPassedIn) {
    loggedIn.push({
      label: t('header.myApplicationsAndCoverage'),
      href: `${primaryDomain}/marketplace/auth/global/${ffmLocalePath}/myProfile#landingPage`,
    });
    loggedIn.push({
      label: t('header.myProfile'),
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
    loggedOut.push(Object.assign({ identifier: LinkIdentifier.LOGIN }, logLink));
  }

  if (!hideLogoutLink) {
    loggedIn.push({
      identifier: LinkIdentifier.LOGOUT,
      label: t('header.logout'),
      href: `${primaryDomain || ''}/logout`,
    });
  }

  const links = {};
  links[VARIATION_NAMES.LOGGED_OUT] = loggedOut;
  links[VARIATION_NAMES.LOGGED_IN] = loggedIn;

  return links;
}

export default defaultMenuLinks;
