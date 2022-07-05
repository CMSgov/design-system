export function updateThemeLocalStorage(themeParam: string) {
  let theme = 'core';
  if (typeof window !== 'undefined') {
    if (themeParam !== null) {
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
