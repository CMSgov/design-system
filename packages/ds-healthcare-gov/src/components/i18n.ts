/**
 * @file Adds translations to core translation module
 */
import en from './locale/en.json';
import es from './locale/es.json';
import { addTranslations } from '@cmsgov/design-system';

addTranslations('en', en);
addTranslations('es', es);
