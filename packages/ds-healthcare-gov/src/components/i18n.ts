/**
 * @file Adds translations to core translation module and exports the i18n-related
 * functions. We want components in this child design system that use translation to
 * import their translation functions from this module so we get the side-effects of
 * adding our package-specific translations. Note that even though the components in this
 * child design system import their i18n functions directly from this module, we still
 * need to declare that this module has side effects in our package.json in order to keep
 * compilers from tree-shaking out the calls to `addTranslations`.
 */
import en from './locale/en.json';
import es from './locale/es.json';
import {
  addTranslations,
  getLanguage,
  languageMatches,
  t,
  translate,
  tWithLanguage,
} from '@cmsgov/design-system';
import type { Language, TFunction } from '@cmsgov/design-system';
export type { Language, TFunction };

addTranslations('en', en);
addTranslations('es', es);

export { getLanguage, languageMatches, t, translate, tWithLanguage };
