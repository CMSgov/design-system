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
  // TODO: This may look very weird, but it's a band-aid until we can release a breaking change.
  // Inside each language object (which holds all the translations), we are adding a namespace
  // for each of the languages. In our old API for healthcare.gov, the language was passed to
  // each component that needed it. Now we want to have the language set in one place, and we
  // want to try to auto- detect the language first. In order to be backwards-compatible with
  // the old API, we need to be able to switch languages inside each component's render
  // function. Instead actually calling `i18n.changeLanguage` inside a render function (which
  // would make that function impure), we'll set the namespace to `es` or `en`. When we fully
  // deprecate the old per- component language API, we can remove this hack. - PW
  es: {
    ...es,
    // See comment above
    es,
    en,
  },
  en: {
    ...en,
    // See comment above
    es,
    en,
  },
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

export { i18nInstance as i18n };
export default i18nInstance;
