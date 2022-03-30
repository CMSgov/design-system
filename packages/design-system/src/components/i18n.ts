import en from './locale/en.json';
import es from './locale/es.json';
import get from 'lodash/get';
import { NestedKeyOf } from './utilities/nestedKeyTypes';

export type Language = 'en' | 'es';

let language: Language = 'en';

export function getLanguage() {
  return language;
}

export function setLanguage(lang: Language) {
  language = lang;
}

type Translations = { [key: string]: string | Translations };
type AllTranslations = { [key in Language]: Translations };

// interface GenericTFunction<TranslationsType extends object> {
//   <K extends NestedKeyOf<TranslationsType>>(
//     lang: Language | undefined,
//     key: K,
//     data?: { [key: string]: string | number }
//   ): string;
// }

export function initTranslations(allTranslations: AllTranslations) {
  function extend(newTranslations: AllTranslations) {
    return initTranslations({
      en: { ...allTranslations.en, ...newTranslations.en },
      es: { ...allTranslations.es, ...newTranslations.es },
    });
  }

  function getTranslations(lang: Language = getLanguage()) {
    return allTranslations[lang];
  }

  /**
   * Because language strings can contain region subtags, we need a way to compare
   * just the language portion of two language strings. This function compares two
   * locale strings that may or may not contain subtags according to IETF BCP 47.
   * The second string defaults to our i18next instance's current language (which
   * may also contain a subtag depending on what was detected).
   */
  function languageMatches(localeStringA: string, localeStringB: string = getLanguage()) {
    const langA = localeStringA.split('-')[0];
    const langB = localeStringB.split('-')[0];
    return langA === langB;
  }

  /**
   * Returns the translation for a given key for a given language. For most
   * use cases, the `t` function will be more appropriate, where the language
   * is not a required parameter. Use this when you need a translation from
   * a specific language.
   */
  function translate<K extends NestedKeyOf<typeof allTranslations.en | typeof allTranslations.es>>(
    lang: Language = getLanguage(),
    key: K,
    data?: { [key: string]: string | number }
  ): string {
    const rawTranslation = get(getTranslations(lang), key);
    if (data) {
      // Replace template strings with provided data
      const interpolatedTranslation = Object.keys(data).reduce(
        (interpolatedString, dataKey) =>
          interpolatedString.replace(`{{${dataKey}}}`, data[dataKey]),
        rawTranslation
      );
      return interpolatedTranslation;
    } else {
      return rawTranslation;
    }
  }

  /**
   * Returns the translation for a given key in the currently set language
   */
  function t(key: Parameters<typeof translate>[1], data?: Parameters<typeof translate>[2]): string {
    return translate(getLanguage(), key, data);
  }

  function tWithLanguage(lang?: Language) {
    return function t(
      key: Parameters<typeof translate>[1],
      data?: Parameters<typeof translate>[2]
    ): string {
      return translate(lang, key, data);
    };
  }

  return {
    getTranslations,
    extend,
    languageMatches,
    translate,
    t,
    tWithLanguage,
  };
}

const { getTranslations, extend, languageMatches, translate, t, tWithLanguage } = initTranslations({
  en,
  es,
});

export { getTranslations, extend, languageMatches, translate, t, tWithLanguage };

export type TFunction = typeof t;
