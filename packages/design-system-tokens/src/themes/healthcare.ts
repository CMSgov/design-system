/*
 * Healthcare.gov Default CMSDS Theme
 */

import { animation, color, font, measure, media, radius, spacer, z } from '../tokens';
import { ThemeTokens, ColorTokens, ShadowTokens, AnyTokenValues } from '../lib/types';

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
  'focus-dark':                 color['persimmon-500'],
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
  'primary-lightest':           color['sapphire-50'],
  'primary-lighter':            color['sapphire-100'],
  'primary-light':              color['sapphire-300'],
  'primary':                    color['sapphire-500'],
  'primary-dark':               color['sapphire-600'],
  'primary-darker':             color['sapphire-700'],
  'primary-darkest':            color['sapphire-800'],
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
  'info-lightest':              color['darksky-50'],
  'info-lighter':               color['darksky-100'],
  'info-light':                 color['darksky-300'],
  'info':                       color['darksky-500'],
  'info-dark':                  color['darksky-600'],
  'info-darker':                color['darksky-700'],
  'info-darkest':               color['darksky-800'],
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
}

export const shadow: ShadowTokens = {
  'focus':                      `inset 0 0 0 1px ${themeColors['base']}`,
  'focus-inverse':              `inset 0 0 0 1px ${themeColors['base']}`,
  'focus-link':                 `0 3px ${themeColors['base']}`,
  'base-offset-x':              '2px',
  'base-offset-y':              '2px',
  'base-blur-radius':           '4px',
  'base-color':                 color['black-alpha25'],
  'base':                       '2px 2px 4px',
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

const healthcareTheme: ThemeTokens = {
  animation,
  color: themeColors,
  font: {    
    sans: font['family-open-sans'],
    serif: font['family-bitter'],
    ...font,
  },
  global,
  measure,
  media,
  radius,
  shadow,
  spacer,
  z,
}

export default healthcareTheme
