/*
 * CMSDS Font Tokens
 */
import { FontTokens, to } from '../lib/types';

const font = to<FontTokens>()({
  'family-open-sans': "'Open Sans', Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
  'family-rubik': "Rubik, Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
  'family-montserrat': "Montserrat, Avenir, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
  'family-bitter': "Bitter, Superclarendon, 'Bookman Old Style', 'URW Bookman', 'URW Bookman L', 'Georgia Pro', Georgia, serif",
  'line-height-reset': 1,
  'line-height-heading': 1.3,
  'line-height-base': 1.5,
  'line-height-lead': 1.7,
  'size-base': '1rem',
  'size-sm': '.875rem',
  'size-md': '1rem',
  'size-lg': '1.125rem',
  'size-xl': '1.3125rem',
  'size-2xl': '1.5rem',
  'size-3xl': '2.25rem',
  'size-4xl': '3rem',
  'size-5xl': '3.75rem',
  'weight-light': 300,
  'weight-normal': 400,
  'weight-semibold': 600,
  'weight-bold': 700,
});

export default font;
