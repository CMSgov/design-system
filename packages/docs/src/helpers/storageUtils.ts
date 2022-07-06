/**
 * Accepts an optional themeParam if setting using a query parameter.
 * If the themeParam is non-null/undefined, will update localStorage.theme
 * with value of themeParam and return itself. If themeParam doesn't exist
 * or is nullable will search localStorage for existing theme item, if none
 * is found will return the default of 'core'
 *
 * @param {string} themeParam - optional theme to set in localStorage
 */
export function updateThemeLocalStorage(themeParam: string) {
  let theme = 'core';
  if (typeof window !== 'undefined') {
    if (themeParam) {
      localStorage.setItem('theme', themeParam);
      return themeParam;
    } else {
      if ('theme' in localStorage) {
        theme = localStorage.getItem('theme');
      }
      return theme;
    }
  } else {
    return theme;
  }
}
