/*
 * CMSDS Font Tokens
 */
import { FontTokens, to } from '../lib/types';

const font = to<FontTokens>()({
  'family-open-sans': "'Open Sans', Helvetica, sans-serif",
  'family-rubik': "'Rubik', sans-serif",
  'family-montserrat': "'Montserrat', sans-serif",
  'family-bitter': 'Bitter, Georgia, serif',
  'line-height-reset': 1,
  'line-height-heading': 1.3,
  'line-height-base': 1.5,
  'line-height-lead': 1.7,
  'size-base': '16px',
  'size-sm': '14px',
  'size-md': '16px',
  'size-lg': '18px',
  'size-xl': '21px',
  'size-2xl': '24px',
  'size-3xl': '36px',
  'size-4xl': '48px',
  'size-5xl': '60px',
  'weight-normal': 400,
  'weight-semibold': 600,
  'weight-bold': 700,
});

export default font;
