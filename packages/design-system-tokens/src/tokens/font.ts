/*
 * CMSDS Font Tokens
 */
import { FontTokens, to } from '../lib/types';

export const fontFamily = to<FontTokens>()({
  'family-open-sans': "'Open Sans', Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
  'family-rubik': "Rubik, Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
  'family-montserrat': "Montserrat, Avenir, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
  'family-bitter': "Bitter, Superclarendon, 'Bookman Old Style', 'URW Bookman', 'URW Bookman L', 'Georgia Pro', Georgia, serif",
});

export const fontSize = to<FontTokens>()({
  '10': '0.875rem',
  '20': '1rem',
  '30': '1.125rem',
  '40': '1.3125rem',
  '50': '1.5rem',
  '60': '1.875rem',
  '70': '2.25rem',
  '80': '3rem',
  '90': '3.75rem',
});
