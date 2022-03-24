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
    interpolation: {
      escapeValue: false, // React doesn't need this
    },
    // lng: 'en',
    resources,
  },
  function (err) {
    if (err) {
      throw new Error(err);
    }
  }
);

export function getLanguage(): Language {
  return i18nInstance.language as Language;
}

export { i18nInstance as i18n };
export default i18nInstance;
