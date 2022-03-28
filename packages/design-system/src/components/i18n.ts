/* eslint-disable filenames/match-exported */
/**
 * @file Initializes and exports a single i18next instance,
 *  responsible for rendering internationalized strings.
 */
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locale/en.json';
import es from './locale/es.json';
import i18n from 'i18next';

export type Language = 'en' | 'es';

const resources = {
  es,
  en,
} as const;

const i18nInstance = i18n.createInstance();

i18nInstance.use(LanguageDetector).init(
  {
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React doesn't need this
    },
    resources,
  },
  function (err) {
    if (err) {
      throw new Error(err);
    }
  }
);

// TODO: Remove this after UsaBanner locale prop is deprecated.
// See comment in packages/ds-healthcare-gov/src/components/i18n.ts for details
i18nInstance.addResourceBundle('en', 'es:usaBanner', es.usaBanner, true);
i18nInstance.addResourceBundle('es', 'en:usaBanner', en.usaBanner, true);

export function getLanguage(): Language {
  return i18nInstance.language as Language; // || 'en' Actually, I should remove this and figure out why it broke Loki tests, because it actually does detect a language correctly
}

export function setLanguage(...args: Parameters<typeof i18nInstance.changeLanguage>) {
  return i18nInstance.changeLanguage(...args);
}

/**
 * Because language strings can contain region subtags, we need a way to compare
 * just the language portion of two language strings. This function compares two
 * locale strings that may or may not contain subtags according to IETF BCP 47.
 * The second string defaults to our i18next instance's current language (which
 * may also contain a subtag depending on what was detected).
 */
export function languageMatches(localeStringA: string, localeStringB: string = getLanguage()) {
  const langA = localeStringA.split('-')[0];
  const langB = localeStringB.split('-')[0];
  return langA === langB;
}

export { i18nInstance as i18n };
export default i18nInstance;
