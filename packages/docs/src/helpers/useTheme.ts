import { useState, useEffect } from 'react';
import { getQueryParamValue, setQueryParam } from './urlUtils';
import themes from '../../../../themes.json';

const STORAGE_TOKEN_NAME = 'cmsds_theme';
const QUERY_PARAM_NAME = 'theme';

function isThemeName(value: string | null): value is string {
  return value !== null && Object.keys(themes).includes(value);
}

/**
 * Checks for current theme using query params and then localStorage
 * in that order. If neither is detected, set localStorage to 'core'
 * and return 'core. If either is found, set localStorage if needed
 * and return found value
 */
function useTheme() {
  const queryParamValue = getQueryParamValue(QUERY_PARAM_NAME);
  const themeQueryParam = isThemeName(queryParamValue) ? queryParamValue : null;
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
        const storedTheme = localStorage.getItem(STORAGE_TOKEN_NAME);
        if (isThemeName(storedTheme)) {
          newTheme = storedTheme;
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
