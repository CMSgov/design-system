/**
 * Falls back to a more generic locale if the more specific one isn't
 * available in this browser. Testing platforms tend to have only a
 * few locales.
 */
export function fallbackLocale(language: string, subtag: string) {
  try {
    const locale = `${language}-${subtag}`;
    new Date().toLocaleString(locale);
    return locale;
  } catch (error) {
    return language;
  }
}
