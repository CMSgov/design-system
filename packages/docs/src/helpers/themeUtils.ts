import { getQueryParamValue, setQueryParam } from './urlUtils';

const STORAGE_TOKEN_NAME = 'cmsds_theme';
const QUERY_PARAM_NAME = 'theme';

/**
 * Checks for current theme using query params and then localStorage
 * in that order. If neither is detected, set localStorage to 'core'
 * and return 'core. If either is found, set localStorage if needed
 * and return found value
 */
export function getTheme() {
  const themeQueryParam = getQueryParamValue(QUERY_PARAM_NAME);
  let theme = 'core';

  if (typeof window !== 'undefined') {
    // query param found, set in local storage and return it
    if (themeQueryParam !== null) {
      localStorage.setItem(STORAGE_TOKEN_NAME, themeQueryParam);
      return themeQueryParam;
    } else {
      // no query param, so check localStorage theme. if found, return otherwise return 'core'
      if (STORAGE_TOKEN_NAME in localStorage) {
        theme = localStorage.getItem(STORAGE_TOKEN_NAME);
      }
      // if no query param val was set, make sure to set it to the value in local storage or 'core' by default
      setQueryParam(QUERY_PARAM_NAME, theme);
      return theme;
    }
  } else {
    // browser not found, return 'core'
    return theme;
  }
}
