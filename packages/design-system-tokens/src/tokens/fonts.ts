/*
 * CMSDS Font Tokens
 */
import { FontTokens } from '../lib/types';

const makeFonts = <T extends FontTokens>(value: T) => {
  return value;
};

const fonts = makeFonts({
  family: {
    sans: {
      'open-sans': '"Open Sans", Helvetica, sans-serif',
    },
    serif: {
      bitter: 'Bitter, Georgia, serif',
    },
  },
  size: {
    base: '16px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '21px',
    '2xl': '24px',
    '3xl': '36px',
    '4xl': '48px',
    '5xl': '60px',
  },
  lineHeight: {
    reset: '1',
    base: '1.5',
    heading: '1.3',
    lead: '1.7',
  },
  weight: {
    normal: '400',
    bold: '700',
    semibold: '600',
  },
  measure: {
    narrow: '45ex',
    base: '65ex',
    wide: '80ex',
  },
});

export default fonts;
