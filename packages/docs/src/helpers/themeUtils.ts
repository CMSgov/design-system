import { getQueryParamValue } from './urlUtils';

/**
 * Checks for current theme using query params and then localStorage
 * in that order. If neither is detected, set localStorage to 'core'
 * and return 'core. If either is found, set localStorage if needed
 * and return found value
 */
export function getTheme() {
  const themeQueryParam = getQueryParamValue('theme');
  let theme = 'core';

  if (typeof window !== 'undefined') {
    // query param found, set and return it
    if (themeQueryParam) {
      localStorage.setItem('theme', theme);
      return themeQueryParam;
    } else {
      // returning localStorage theme if found, otherwise 'core'
      if ('theme' in localStorage) {
        theme = localStorage.getItem('theme');
      }
      return theme;
    }
  } else {
    // browser not found, return 'core'
    return theme;
  }
}
