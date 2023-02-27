/*
 * Medicare.gov CMSDS Theme
 */

import { animation, color, font, measure, media, radius, spacer, z } from '../tokens';
import { FontTokens, ThemeTokens, ColorTokens, ShadowTokens, AnyTokenValues } from '../lib/types';

export const themeColors: ColorTokens = {
  //
  'white':                      color['white-solid'],
  'black':                      color['black-solid'],
  'transparent':                color['transparent'],
  'transparent-black-alpha50':  color['black-alpha50'],
  'transparent-black-alpha25':  color['black-alpha25'],
  'transparent-white-alpha50':  color['white-alpha50'],
  'transparent-white-alpha25':  color['white-alpha25'],
  //
  'background':                 color['white-solid'],
  'background-dialog':          color['white-solid'],
  'background-dialog-mask':     color['black-alpha50'],
  'background-inverse':         color['teal-500'],
  //
  'base':                       color['granite-800'],
  'base-inverse':               color['white-solid'],
  //
  'border':                     color['granite-100'],
  'border-dark':                color['lapis-800'],
  'border-inverse':             color['white-solid'],
  //
  'error':                      color['crimson-500'],
  'error-dark':                 color['crimson-600'],
  'error-darker':               color['rose-700'],
  'error-darkest':              color['rose-800'],
  'error-light':                color['crimson-100'],
  'error-lighter':              color['rose-100'],
  'error-lightest':             color['crimson-50'],
  //
  'focus':                      color['copper-500'],
  'focus-border-inverse':       color['goldenrod-800'],
  'focus-dark':                 color['copper-500'],
  'focus-inverse':              color['sky-500'],
  'focus-light':                color['white-solid'],
  'focus-shadow':               color['granite-900'],
  'focus-shadow-inverse':       color['granite-900'],
  'focus-shadow-link':          color['granite-900'],
  'focus-shadow-link-inverse':  color['goldenrod-800'],
  //
  'gray-lightest':	            color['granite-50'],
  'gray-lighter':	              color['granite-100'],
  'gray-light':	                color['granite-300'],
  'gray':	                      color['granite-500'],
  'gray-dark':	                color['granite-700'],
  'gray-darker':	              color['granite-800'],
  'gray-darkest':	              color['granite-900'],
  //
  'muted':                      color['granite-700'],
  'muted-inverse':              color['lapis-50'],
  //
  'primary-lightest':           color['teal-50'],
  'primary-lighter':            color['teal-100'],
  'primary-light':              color['teal-300'],
  'primary':                    color['teal-500'],
  'primary-dark':               color['teal-600'],
  'primary-darker':             color['teal-700'],
  'primary-darkest':            color['teal-800'],
  // @TODO: deprecate primary-alt as secondary
  'primary-alt':                color['lapis-500'],
  'primary-alt-dark':           color['lapis-600'],
  'primary-alt-darker':         color['lapis-700'],
  'primary-alt-darkest':        color['lapis-800'],
  'primary-alt-light':          color['lapis-300'],
  'primary-alt-lightest':       color['lapis-50'],
  //
  'secondary-lightest':         color['lapis-50'],
  'secondary-lighter':          color['lapis-100'],
  'secondary-light':            color['lapis-300'],
  'secondary':                  color['lapis-500'],
  'secondary-dark':             color['lapis-600'],
  'secondary-darker':           color['lapis-700'],
  'secondary-darkest':          color['lapis-800'],
  //
  'info':                       color['lapis-500'],
  'info-dark':                  color['lapis-600'],
  'info-darker':                color['lapis-700'],
  'info-darkest':               color['lapis-800'],
  'info-light':                 color['lapis-300'],
  'info-lighter':               color['lapis-100'],
  'info-lightest':              color['lapis-50'],
  //
  'success':                    color['spring-500'],
  'success-dark':               color['spring-600'],
  'success-darker':             color['spring-700'],
  'success-darkest':            color['spring-800'],
  'success-light':              color['spring-300'],
  'success-lighter':            color['spring-100'],
  'success-lightest':           color['spring-50'],
  //
  'warn':                       color['goldenrod-500'],
  'warn-dark':                  color['goldenrod-600'],
  'warn-darker':                color['goldenrod-700'],
  'warn-darkest':               color['goldenrod-800'],
  'warn-light':                 color['goldenrod-300'],
  'warn-lighter':               color['goldenrod-100'],
  'warn-lightest':              color['goldenrod-50'],
  //
  'visited':                    color['crimson-800'],
  // TODO: deprecate these old definitions
  'teal-700':                   color['teal-700'],
  'teal-500':                   color['teal-500'],
  'teal-300':                   color['teal-300'],
  'teal-100':                   color['teal-100'],
  'blue-700':                   color['lapis-700'],
  'blue-500':                   color['lapis-500'],
  'blue-300':                   color['lapis-300'],
  'blue-100':                   color['lapis-100'],
  'green-700':                  color['spring-700'],
  'green-500':                  color['spring-500'],
  'green-300':                  color['spring-100'],
  'green-100':                  color['spring-50'],
  'black-700':                  color['granite-900'],
  'black-500':                  color['granite-800'],
  'black-300':                  color['granite-700'],
  'black-200':                  color['granite-600'],
  'black-100':                  color['granite-100'],
  'black-50':                   color['granite-50'],
  'yellow-700':                 color['goldenrod-600'],
  'yellow-500':                 color['goldenrod-500'],
  'yellow-300':                 color['goldenrod-300'],
  'yellow-100':                 color['goldenrod-50'],
  'red-700':                    color['crimson-600'],
  'red-500':                    color['crimson-500'],
  'red-300':                    color['crimson-100'],
  'red-100':                    color['crimson-50'],
}

export const shadow: ShadowTokens = {
  'focus':                      `inset 0 0 0 1px ${themeColors['base']}`,
  'focus-inverse':              `inset 0 0 0 1px ${themeColors['base']}`,
  'focus-link':                 `0 3px ${themeColors['base']}`,
  'focus-link-inverse':         `0 3px ${themeColors['focus-border-inverse']}`,
  'box-card': '0 2px 3px 0 rgba(50, 50, 50, 0.23)',
  'base-offset-x':              '2px',
  'base-offset-y':              '2px',
  'base-blur-radius':           '4px',
  'base-color':                 color['black-alpha25'],
  'base':                       '2px 2px 4px',
};

const fonts: FontTokens = {
  ...font,
  'size-lg': '20px',
  'size-xl': '24px',
  'size-2xl': '32px',
  'size-3xl': '40px',
  'size-4xl': '44px',
  'size-5xl': '50px',
  sans: font['family-rubik'],
  montserrat: font['family-montserrat'],
  rubik: font['family-rubik'],
  'weight-light': 400,
  'weight-normal': 400,
  'weight-semibold': 600,
  'weight-bold': 600,
}

export const global: AnyTokenValues = {
  'article-max-width':          '600px',
  'grid-columns':               '12',
  'grid-gutter-width':          spacer[4],
  'grid-form-gutter-width':     spacer[2],
  'lead-max-width':             '77rem',
  'nav-width':                  '951px',
  'site-margins':               '3rem',
  'site-margins-mobile':        '1.5rem',
  'site-max-width':             '1040px',
  'text-max-width':             '53rem',
};

const medicareTheme: ThemeTokens = {
  animation,
  color: themeColors,
  font: fonts,
  global,
  measure,
  media,
  radius,
  shadow,
  spacer,
  z,
}

export default medicareTheme
