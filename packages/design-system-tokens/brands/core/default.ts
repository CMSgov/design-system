import * as Token from '../../tokens/';
import * as Types from '../../lib/types';

const makeTheme = <T extends Types.ThemeTokens>(value: T) => {
  return value;
};

const THEME_NAME = 'core-default';
const THEME_TOKENS = makeTheme({
  color: {
    'color-white': Token.Color.white,
    'color-black': Token.Color.black,
    'color-gray': Token.Color['color-neutral-500'],
  },
  spacing: { ...Token.Spacing },
});

export default { name: THEME_NAME, tokens: THEME_TOKENS } as Types.Theme;
