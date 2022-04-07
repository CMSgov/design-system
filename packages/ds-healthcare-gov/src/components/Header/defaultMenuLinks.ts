import { Link, VARIATION_NAMES } from './Header';
import localeLink from './localeLink';
import loginLink from './loginLink';
import { Language, languageMatches, tWithLanguage } from '../i18n';

export enum LinkIdentifier {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

export interface DefaultLink extends Link {
  identifier?: LinkIdentifier;
}

export interface DefaultMenuLinkOptions {
  /**
   * @deprecated - This is now deprecated in favor of the global language setting. See guides/internationalization
   */
  locale?: Language;
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
    locale,
    deConsumer,
    subpath,
    primaryDomain = '',
    switchLocaleLink,
    hideLoginLink,
    hideLogoutLink,
    hideLanguageSwitch,
    customLinksPassedIn,
  } = options;
  const t = tWithLanguage(locale);
  const isSpanish = languageMatches('es', locale);
  const ffmLocalePath = isSpanish ? 'es_MX' : 'en_US';

  if (locale) {
    console.warn(
      `[Deprecated]: Please remove the 'initialLanguage' prop in 'defaultMenuLinks' in favor of global language setting. This prop is deprecated and will be removed in a future release.`
    );
  }

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
