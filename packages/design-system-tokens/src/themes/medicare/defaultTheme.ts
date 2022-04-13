import { color, font } from '../../tokens';
import { to, ThemeTokens, ColorTokens } from '../../lib/types';

/*
 * This theme currently inherits from the core theme so only needs
 * to provide overrides to that themes definitions. In the future this
 * theme should provide a full set of definitions.
 */

const description = 'Default Medicare.gov Theme';

const themeColors: ColorTokens = {
  'teal-700': color['teal-700'],
  'teal-500': color['teal-500'],
  'teal-300': color['teal-300'],
  'teal-100': color['teal-100'],
  'blue-700': color['lapis-700'],
  'blue-500': color['lapis-500'],
  'blue-300': color['lapis-300'],
  'blue-100': color['lapis-100'],
  'green-700': color['spring-700'],
  'green-500': color['spring-500'],
  'green-300': color['spring-100'],
  'green-100': color['spring-50'],
  'black-700': color['granite-900'],
  'black-500': color['granite-800'],
  'black-300': color['granite-700'],
  'black-200': color['granite-600'],
  'black-100': color['granite-100'],
  'black-50': color['granite-50'],
  'yellow-700': color['goldenrod-600'],
  'yellow-500': color['goldenrod-500'],
  'yellow-300': color['goldenrod-300'],
  'yellow-100': color['goldenrod-50'],
  'red-700': color['crimson-600'],
  'red-500': color['crimson-500'],
  'red-300': color['crimson-100'],
  'red-100': color['crimson-50'],
  primary: color['teal-500'],
  'primary-dark': color['teal-700'],
  'primary-darker': color['ocean-800'],
  'primary-darkest': color['ocean-900'],
  'primary-light': color['teal-300'],
  'primary-lightest': color['teal-100'],
  'primary-alt': color['lapis-500'],
  'primary-alt-dark': color['lapis-700'],
  'primary-alt-darker': color['lapis-800'],
  'primary-alt-darkest': color['lapis-900'],
  'primary-alt-light': color['lapis-200'],
  'primary-alt-lightest': color['dark-sky-50'],
  secondary: color['lapis-500'],
  'secondary-dark': color['lapis-500'],
  'secondary-darker': color['lapis-500'],
  'secondary-darkest': color['lapis-500'],
  'secondary-light': color['lapis-200'],
  'secondary-lightest': color['dark-sky-50'],
  gray: color['granite-700'],
  'gray-dark': color['granite-800'],
  'gray-darker': color['granite-900'],
  'gray-light': color['granite-600'],
  'gray-lighter': color['granite-100'],
  'gray-lightest': color['granite-50'],
  green: color['spring-500'],
  'green-dark': color['spring-700'],
  'green-lighter': color['spring-100'],
  'green-lightest': color['spring-50'],
  warn: color['goldenrod-500'],
  'warn-dark': color['goldenrod-600'],
  'warn-light': color['goldenrod-300'],
  'warn-lightest': color['goldenrod-50'],
  error: color['crimson-500'],
  'error-dark': color['crimson-600'],
  'error-light': color['crimson-100'],
  'error-lightest': color['crimson-50'],
  visited: color['crimson-800'],
  base: color['granite-800'],
  'background-inverse': color['teal-500'],
};

const components = {
  // autocomplete
  'autocomplete-list__background-color': themeColors.white,
  'autocomplete-list__border-color': themeColors['gray-lighter'],
  'autocomplete-list-item__font-color': themeColors.primary,
  'autocomplete-list-item__background-color--active': themeColors['primary-alt-darkest'],
  'autocomplete-list-item__font-color--active': themeColors.white,
  'autocomplete-list-item-message__font-color': themeColors.muted,
  // badge
  'badge__background-color': themeColors.gray,
  'badge__font-color': themeColors.white,
  'badge__background-color--alert': themeColors.error,
  'badge__background-color--info': themeColors.primary,
  'badge__background-color--success': themeColors.success,
  'badge__background-color--warn': themeColors.warn,
  'badge__font-color--warn': themeColors.base,
};

const shadow = {
  'box-card': '0 2px 3px 0 rgba(50, 50, 50, 0.23)',
};

const DefaultTheme = to<ThemeTokens>()({
  color: themeColors,
  components,
  description,
  font,
  shadow,
});

export default DefaultTheme;
