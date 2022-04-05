import { animation, color, font, measure, spacer } from './tokens';
import { to, ThemeTokens, ColorTokens } from './lib/types';

const description = 'Theme Template Description';

const themeColors: ColorTokens = {};

const components = {};

const shadow = {};

const ThemeTemplate = to<ThemeTokens>()({
  animation,
  color: themeColors,
  components,
  description,
  font: {
    sans: font['family-open-sans'],
    serif: font['family-bitter'],
    ...font,
  },
  measure,
  shadow,
  spacer,
});

export default ThemeTemplate;
