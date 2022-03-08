/*
 * CMSDS Font Tokens
 */
import { FontTokens } from '../lib/types';

const makeFonts = <T extends FontTokens>(value: T) => {
  return value;
};

const font = makeFonts({
  'family-open-sans': '"Open Sans", Helvetica, sans-serif',
  'family-rubik': '"Rubik", sans-serif',
  'family-montserrat': '"Montserrat", sans-serif',
  'family-bitter': 'Bitter, Georgia, serif',
  'size-base': '16px',
  'size-sm': '14px',
  'size-md': '16px',
  'size-lg': '18px',
  'size-xl': '21px',
  'size-2xl': '24px',
  'size-3xl': '36px',
  'size-4xl': '48px',
  'size-5xl': '60px',
  'lineHeight-reset': 1,
  'lineHeight-base': 1.5,
  'lineHeight-heading': 1.3,
  'lineHeight-lead': 1.7,
  'weight-normal': 400,
  'weight-bold': 700,
  'weight-semibold': 600,
  'measure-narrow': '45ex',
  'measure-base': '65ex',
  'measure-wide': '80ex',
});

export default font;
