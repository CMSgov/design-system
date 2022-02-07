import * as Tokens from '../../tokens';
import * as Types from '../../lib/types';

const makeTheme = <T extends Types.ThemeTokens>(value: T) => {
  return value;
};

const DefaultTheme = makeTheme({
  description: 'Default CMSDS Core Theme',
  color: {
    'color-white': Tokens.color.white,
    'color-black': Tokens.color.black,
    'color-gray': Tokens.color['granite-500'],
  },
  spacing: { ...Tokens.spacing },
});

export default DefaultTheme;
