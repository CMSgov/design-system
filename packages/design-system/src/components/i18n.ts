import en from './locale/en.json';
import es from './locale/es.json';
import get from 'lodash/get';
import { NestedPaths, TypeFromPath } from './utilities/nestedPathTypes';

export type Language = 'en' | 'es';

let language: Language = 'en';

export function getLanguage() {
  return language;
}

export function setLanguage(lang: Language) {
  language = lang;
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

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

// export function t<K extends NestedPaths<typeof en>>(
//   key: K
// ): TypeFromPath<typeof en, K> {
//   const translations = languageMatches('en', language) ? en : es;
//   const rawTranslation = get(translations, key);
//   return rawTranslation;
// }

export function t<K extends NestedKeyOf<typeof en | typeof es>>(key: K): string {
  const translations = languageMatches('en', language) ? en : es;
  const rawTranslation = get(translations, key);
  return rawTranslation;
}
