/**
 * @file Adds translations to core translation module and exports the i18n-
 * related functions. We want components in this child design system that use
 * translation to import their translation functions from this module so we
 * get the side-effects of adding our package-specific translations. It's not
 * the cleanest way to do things, probably, but it's compatible with unit
 * tests and Storybook, which expect each component to get everything it
 * needs from its imports.
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
