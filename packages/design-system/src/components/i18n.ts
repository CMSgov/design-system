import en from './locale/en.json';
import es from './locale/es.json';
import get from 'lodash/get';

export type Language = 'en' | 'es';

let language: Language = 'en';

export function getLanguage() {
  return language;
}

export function setLanguage(lang: Language) {
  language = lang;
}

type Translations = { [key: string]: string | Translations };

export function getTranslations(lang: Language = getLanguage()): Translations {
  return languageMatches('en', lang) ? en : es;
}

export function addTranslations(lang: Language, translations: Translations) {
  Object.assign(getTranslations(lang), translations);
}

/**
 * Because language strings can contain region subtags, we need a way to compare
 * just the language portion of two language strings. This function compares two
 * locale strings that may or may not contain subtags according to IETF BCP 47.
 * The second string defaults to our globally set language.
 */
export function languageMatches(localeStringA: string, localeStringB: string = getLanguage()) {
  const langA = localeStringA.split('-')[0];
  const langB = localeStringB.split('-')[0];
  return langA === langB;
}

/**
 * Falls back to a more generic locale if the more specific one isn't
 * available in this browser. Testing platforms tend to have only a
 * few locales.
 */
export function fallbackLocale(language: string, subtag: string) {
  try {
    const locale = `${language}-${subtag}`;
    new Date().toLocaleString(locale);
    return locale;
  } catch (error) {
    return language;
  }
}

/**
 * Returns the translation for a given key for a given language. For most
 * use cases, the `t` function will be more appropriate, where the language
 * is not a required parameter. Use this when you need a translation from
 * a specific language.
 */
export function translate(
  lang: Language = getLanguage(),
  key: string,
  data?: { [key: string]: string | number }
): string {
  const rawTranslation = get(getTranslations(lang), key);
  if (data) {
    // Replace template strings with provided data
    const interpolatedTranslation = Object.keys(data).reduce(
      (interpolatedString, dataKey) => interpolatedString.replace(`{{${dataKey}}}`, data[dataKey]),
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
export function t(
  key: Parameters<typeof translate>[1],
  data?: Parameters<typeof translate>[2]
): string {
  return translate(getLanguage(), key, data);
}

export type TFunction = typeof t;

export function tWithLanguage(lang?: Language) {
  return function t(
    key: Parameters<typeof translate>[1],
    data?: Parameters<typeof translate>[2]
  ): string {
    return translate(lang, key, data);
  };
}
