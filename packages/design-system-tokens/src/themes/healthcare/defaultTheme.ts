import { animation, color, font, measure, media, spacer } from '../../tokens';
import { to, ThemeTokens, ColorTokens } from '../../lib/types';

/*
 * This theme currently inherits from the core theme so only needs
 * to provide overrides to that themes definitions. In the future this
 * theme should provide a full set of definitions.
 */

const description = 'Default Healthcare.gov Theme';

const themeColors: ColorTokens = {
  primary: color['sapphire-500'],
  'primary-darker': color['sapphire-500'],
  'primary-darkest': color['sapphire-600'],
  'primary-alt': color['dark-sky-500'],
  'primary-alt-lightest': color['cerulean-50'],
  secondary: color['crimson-500'],
  'secondary-dark': color['crimson-700'],
  'secondary-light': color['rose-200'],
  'secondary-lightest': color['rose-50'],
  'gray-lightest': color['granite-50'],
  green: color['spring-500'],
  'green-light': color['spring-700'],
  'green-lighter': color['spring-200'],
  'green-lightest': color['spring-50'],
  'focus-light': color.white,
  'focus-dark': color['rose-400'],
  warn: color['goldenrod-500'],
  'warn-light': color['goldenrod-400'],
  'success-dark': color['spring-600'],
  'success-darker': color['spring-700'],
};

const components = {};

const shadow = {};

const DefaultTheme = to<ThemeTokens>()({
  animation,
  color: themeColors,
  components,
  description,
  font,
  measure,
  media,
  shadow,
  spacer,
});

export default DefaultTheme;
