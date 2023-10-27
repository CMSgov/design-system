/*
 * Core CMSDS Theme
 */

import { animation, color, fontFamily, fontSize, measure, media, radius, spacer, z } from '../tokens';
import { ThemeTokens, ColorTokens, AnyTokenValues, ShadowTokens, FontTokens } from '../lib/types';

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
  'background-inverse':         color['ocean-800'],
  //
  'base':                       color['granite-900'],
  'base-inverse':               color['white-solid'],
  //
  'border':                     color['granite-100'],
  'border-dark':                color['lapis-800'],
  'border-inverse':             color['white-solid'],
  //
  'error-lightest':             color['rose-50'],
  'error-lighter':              color['rose-100'],
  'error-light':                color['rose-300'],
  'error':                      color['rose-500'],
  'error-dark':                 color['rose-600'],
  'error-darker':               color['rose-700'],
  'error-darkest':              color['rose-800'],
  //
  'focus-light':                color['white-solid'],
  'focus-dark':                 color['orchid-500'],
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
  'primary-lightest':           color['ocean-50'],
  'primary-lighter':            color['ocean-100'],
  'primary-light':              color['ocean-300'],
  'primary':                    color['ocean-500'],
  'primary-dark':               color['ocean-600'],
  'primary-darker':             color['ocean-700'],
  'primary-darkest':            color['ocean-800'],
  //
  'secondary-lightest':         color['spring-50'],
  'secondary-lighter':          color['spring-100'],
  'secondary-light':            color['spring-300'],
  'secondary':                  color['spring-500'],
  'secondary-dark':             color['spring-600'],
  'secondary-darker':           color['spring-700'],
  'secondary-darkest':          color['spring-800'],
  //
  'accent-primary-lightest':    color['persimmon-50'],
  'accent-primary-lighter':     color['persimmon-100'],
  'accent-primary-light':       color['persimmon-300'],
  'accent-primary':             color['persimmon-500'],
  'accent-primary-dark':        color['persimmon-600'],
  'accent-primary-darker':      color['persimmon-700'],
  'accent-primary-darkest':     color['persimmon-800'],
  //
  'info-lightest':              color['sky-50'],
  'info-lighter':               color['sky-100'],
  'info-light':                 color['sky-300'],
  'info':                       color['sky-500'],
  'info-dark':                  color['sky-600'],
  'info-darker':                color['sky-700'],
  'info-darkest':               color['sky-800'],
  //
  'success-lightest':           color['spring-50'],
  'success-lighter':            color['spring-100'],
  'success-light':              color['spring-300'],
  'success':                    color['spring-500'],
  'success-dark':               color['spring-600'],
  'success-darker':             color['spring-700'],
  'success-darkest':            color['spring-800'],
  //
  'warn-lightest':              color['goldenrod-50'],
  'warn-lighter':               color['goldenrod-100'],
  'warn-light':                 color['goldenrod-300'],
  'warn':                       color['goldenrod-500'],
  'warn-dark':                  color['goldenrod-600'],
  'warn-darker':                color['goldenrod-700'],
  'warn-darkest':               color['goldenrod-800'],
  //
  'visited':                    color['windsor-500'],
};

const font: FontTokens = {
  'sans':                       fontFamily['family-open-sans'],
  'serif':                      fontFamily['family-bitter'],
  'size-base':                  fontSize['20'],
  'size-sm':                    fontSize['10'],
  'size-md':                    fontSize['20'],
  'size-lg':                    fontSize['30'],
  'size-xl':                    fontSize['40'],
  'size-2xl--mobile':           fontSize['50'],
  'size-2xl':                   fontSize['50'],
  'size-3xl--mobile':           fontSize['60'],
  'size-3xl':                   fontSize['70'],
  'size-4xl--mobile':           fontSize['70'],
  'size-4xl':                   fontSize['80'],
  'size-5xl--mobile':           fontSize['70'],
  'size-5xl--tablet':           fontSize['80'],
  'size-5xl':                   fontSize['90'],
  'line-height-reset':          1,
  'line-height-heading':        1.3,
  'line-height-base':           1.5,
  'line-height-lead':           1.7,
  'weight-light':               300,
  'weight-normal':              400,
  'weight-semibold':            600,
  'weight-bold':                700,
};

export const global: AnyTokenValues = {
  'article-max-width':          '600px',
  'grid-columns':               '12',
  'grid-gutter-width':          spacer[4],
  'grid-form-gutter-width':     spacer[2],
  'lead-max-width':             '77rem',
  'nav-width':                  '951px',
  'site-margins':               '3rem',
  'site-margins-mobile':        '1.5rem',
  'site-max-width':             '1104px',
  'text-max-width':             '53rem',
};

export const shadow: ShadowTokens = {
  'focus':                      `inset 0 0 0 1px ${themeColors['base']}`,
  'focus-inverse':              `inset 0 0 0 1px ${themeColors['base']}`,
  'focus-link':                 `0 3px ${themeColors['base']}`,
  'base-offset-x':              '2px',
  'base-offset-y':              '2px',
  'base-blur-radius':           '4px',
  'base-color':                 color['black-alpha25'],
  'base':                       '2px 2px 4px',
};

const coreTheme: ThemeTokens = {
  animation,
  color: themeColors,
  font,
  global,
  measure,
  media,
  radius,
  shadow,
  spacer,
  z,
};

export default coreTheme;
