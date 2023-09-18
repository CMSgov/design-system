import { useState, useEffect } from 'react';
import { getQueryParamValue, setQueryParam } from './urlUtils';

const STORAGE_TOKEN_NAME = 'cmsds_theme';
const QUERY_PARAM_NAME = 'theme';

/**
 * Checks for current theme using query params and then localStorage
 * in that order. If neither is detected, set localStorage to 'core'
 * and return 'core. If either is found, set localStorage if needed
 * and return found value
 */
function useTheme() {
  const themeQueryParam = getQueryParamValue(QUERY_PARAM_NAME);
  const [theme, setTheme] = useState(themeQueryParam ?? 'core');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let newTheme = 'core';
      if (themeQueryParam !== null) {
        // Query param found; set in local storage and in our local state
        localStorage.setItem(STORAGE_TOKEN_NAME, themeQueryParam);
        newTheme = themeQueryParam;
      } else {
        // No query param found, so check localStorage for a theme before
        // falling back to core
        if (STORAGE_TOKEN_NAME in localStorage) {
          newTheme = localStorage.getItem(STORAGE_TOKEN_NAME);
        }
        // if no query param val was set, make sure to set it to the value in local storage or 'core' by default
        setQueryParam(QUERY_PARAM_NAME, newTheme);
      }
      if (newTheme !== theme) {
        setTheme(newTheme);
      }
    }
  }, []);
  return theme;
}

export default useTheme;
