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
import { Language, extend as extendCore, getLanguage } from '@cmsgov/design-system';

const { getTranslations, extend, languageMatches, translate, t, tWithLanguage } = extendCore({
  en,
  es,
});

export {
  Language,
  getLanguage,
  getTranslations,
  extend,
  languageMatches,
  translate,
  t,
  tWithLanguage,
};

export type TFunction = typeof t;
