/*
 * Healthcare.gov Default CMSDS Visual Theme
 */

import { color, spacer, radius } from '../../tokens';
import { to, ThemeTokens, ColorTokens } from '../../lib/types';
import { hexOpacity } from '../../lib/utility';

const description = 'Default Healthcare.gov Theme';

const themeColors: ColorTokens = {
  //
  white: color.white,
  black: color.black,
  //
  background: color.white,
  'background-dialog': color.white,
  'background-dialog-mask': hexOpacity('#000000', 50),
  'background-inverse': color['ocean-800'],
  //
  base: color['granite-900'],
  'base-inverse': color.white,
  //
  border: color['granite-100'],
  'border-dark': color['lapis-800'],
  'border-inverse': color.white,
  //
  'cool-blue': color['sapphire-600'],
  'cool-blue-light': color['sapphire-500'],
  'cool-blue-lighter': color['sapphire-200'],
  'cool-blue-lightest': color['sapphire-50'],
  //
  error: color['rose-500'],
  'error-dark': color['rose-600'],
  'error-darker': color['rose-700'],
  'error-darkest': color['rose-800'],
  'error-light': color['rose-200'],
  'error-lighter': color['rose-100'],
  'error-lightest': color['rose-50'],
  //
  focus: color['dark-sky-500'],
  'focus-border-inverse': color['goldenrod-800'],
  'focus-dark': color['rose-400'],
  'focus-inverse': color['sky-500'],
  'focus-light': color.white,
  'focus-shadow': color['granite-900'],
  'focus-shadow-inverse': color['granite-900'],
  'focus-shadow-link': color['granite-900'],
  'focus-shadow-link-inverse': color['goldenrod-800'],
  //
  gold: color['goldenrod-500'],
  'gold-dark': color['goldenrod-600'],
  'gold-darker': color['goldenrod-700'],
  'gold-darkest': color['goldenrod-800'],
  'gold-light': color['goldenrod-400'],
  'gold-lighter': color['goldenrod-200'],
  'gold-lightest': color['goldenrod-50'],
  //
  gray: color['granite-700'],
  'gray-cool-light': color['ocean-50'],
  'gray-dark': color['granite-800'],
  'gray-light': color['granite-300'],
  'gray-lighter': color['granite-100'],
  'gray-lightest': color['granite-50'],
  'gray-medium': color['granite-600'],
  'gray-warm-dark': color['granite-800'],
  'gray-warm-light': color['granite-50'],
  //
  green: color['spring-500'],
  'green-dark': color['spring-600'],
  'green-darker': color['spring-700'],
  'green-darkest': color['spring-800'],
  'green-light': color['spring-700'],
  'green-lighter': color['spring-200'],
  'green-lightest': color['spring-50'],
  //
  muted: color['granite-700'],
  'muted-inverse': color['lapis-50'],
  //
  primary: color['sapphire-500'],
  'primary-alt': color['dark-sky-500'],
  'primary-alt-dark': color['sky-600'],
  'primary-alt-darkest': color['sky-800'],
  'primary-alt-light': color['dark-sky-200'],
  'primary-alt-lightest': color['cerulean-50'],
  'primary-darker': color['sapphire-500'],
  'primary-darkest': color['sapphire-600'],
  //
  red: color['rose-500'],
  'red-dark': color['rose-600'],
  'red-darker': color['rose-700'],
  'red-darkest': color['rose-800'],
  'red-light': color['rose-200'],
  'red-lighter': color['rose-100'],
  'red-lightest': color['rose-50'],
  //
  secondary: color['crimson-500'],
  'secondary-dark': color['crimson-700'],
  'secondary-light': color['rose-200'],
  'secondary-lightest': color['rose-50'],
  //
  success: color['spring-500'],
  'success-dark': color['spring-600'],
  'success-darker': color['spring-700'],
  'success-darkest': color['spring-800'],
  'success-light': color['spring-400'],
  'success-lighter': color['spring-200'],
  'success-lightest': color['spring-50'],
  //
  warn: color['goldenrod-500'],
  'warn-dark': color['goldenrod-600'],
  'warn-darker': color['goldenrod-700'],
  'warn-darkest': color['goldenrod-800'],
  'warn-light': color['goldenrod-400'],
  'warn-lighter': color['goldenrod-200'],
  'warn-lightest': color['goldenrod-50'],
  //
  visited: color['windsor-500'],
};

const components = {
  // alert
  'alert__background-color': themeColors['primary-alt-lightest'],
  'alert__background-color--error': themeColors['error-lightest'],
  'alert__background-color--lightweight': themeColors.white,
  'alert__background-color--success': themeColors['success-lightest'],
  'alert__background-color--warn': themeColors['warn-lightest'],
  'alert__bar-width': spacer[1],
  'alert__border-left-color': themeColors['primary-alt'],
  'alert__border-color--error': themeColors.error,
  'alert__border-color--success': themeColors.success,
  'alert__border-color--warn': themeColors.warn,
  'alert__font-color': themeColors['base'],
  'alert__icon-size': spacer[5],
  alert__padding: spacer[2],
  'alert-link__font-color': themeColors['primary-darker'],
  'alert-link__font-color--hover': themeColors['primary-darkest'],
  'alert-link__font-color--focus': themeColors['primary-darkest'],
  'alert-link__font-color--active': themeColors['primary-darkest'],
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
  'badge__border-radius': radius.pill,
  // choice + choicelist
  'choice__background-color': themeColors.background,
  'choice__background-color--checked': themeColors.primary,
  'choice__background-color--disabled': themeColors['gray-lighter'],
  'choice__background-color--inverse': 'transparent',
  'choice__background-color--disabled--inverse': hexOpacity(themeColors['muted-inverse'], 15),
  'choice__border-color': themeColors.base,
  'choice__border-color--checked': themeColors.primary,
  'choice__border-color--disabled': themeColors['gray-light'],
  'choice__border-color--error': themeColors.error,
  'choice__border-color--inverse': themeColors.white,
  'choice__border-color--left': themeColors.primary,
  'choice__border-color--focus': themeColors['primary-darker'],
  'choice__border-color--disabled--inverse': themeColors['gray-light'],
  'choice__border-radius': '0px',
  'choice__border-width': '2px',
  'choice__color--unchecked': themeColors.white,
  'choice__color--disabled': themeColors.muted,
  choice__size: spacer[4],
  'choice__size--small': '20px',
  'choice__size-radio': '22px',
  'choice__size-radio--small': '12px',
};

const DefaultTheme = to<ThemeTokens>()({
  color: themeColors,
  components,
  description,
});

export default DefaultTheme;
