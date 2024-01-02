import { Link, VARIATION_NAMES } from './Header';
import { t, languageMatches } from '../i18n';

export enum LinkIdentifier {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

export interface DefaultLink extends Link {
  identifier?: LinkIdentifier;
}

export interface DefaultMenuLinkOptions {
  deConsumer?: boolean;
  subpath?: string;
  primaryDomain?: string;
  switchLocaleLink?: string;
  hideLoginLink?: boolean;
  hideLogoutLink?: boolean;
  hideLanguageSwitch?: boolean;
  customLinksPassedIn?: boolean;
}

/**
 * Default menu links for each header variation.
 * Apps can import this method into their app if they need to
 * extend the existing default list of menu links.
 */
export function defaultMenuLinks(options: DefaultMenuLinkOptions = {}) {
  const {
    deConsumer,
    subpath,
    primaryDomain = '',
    switchLocaleLink,
    hideLoginLink,
    hideLogoutLink,
    hideLanguageSwitch,
    customLinksPassedIn,
  } = options;
  const isSpanish = languageMatches('es');

  // NOTE: order matters here and links will be displayed in order added to the arrays
  const loggedOut = [];
  const loggedIn = [];

  // Links other than the ones inside this if should need to be explicitly hidden for their
  // respective variations. This means the language and login will show even if a custom set
  // of links is passed in.
  if (!customLinksPassedIn) {
    const ffmLocalePath = isSpanish ? 'es_MX' : 'en_US';
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
    const defaultLocaleLink = isSpanish
      ? `https://www.healthcare.gov/${subpath}`
      : `https://www.cuidadodesalud.gov/es/${subpath}`;

    const locLink = {
      label: isSpanish ? t('header.english') : t('header.español'),
      ariaLabel: t('header.langAriaLabel'),
      href: switchLocaleLink ?? defaultLocaleLink,
    };

    loggedOut.push(locLink);
    loggedIn.push(locLink);
  }

  if (!hideLoginLink) {
    loggedOut.push({
      identifier: LinkIdentifier.LOGIN,
      label: t('header.login'),
      href: deConsumer ? `${primaryDomain}/login?check_de=1` : `${primaryDomain}/login`,
    });
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
