export const NUM_MONTHS = 12;

/**
 * Generates an array of month names according to the given or default locale
 *
 * @param  {string} [locale] locale for generating month names
 * @param  {boolean} [short] whether to return short month names
 * @return {string[]}        array of month names
 */
export function getMonthNames(locale, short = true) {
  const options = { month: short ? 'short' : 'long' };
  const months = [];
  for (let i = 0; i < NUM_MONTHS; i++) {
    const date = new Date();
    date.setMonth(i, 1);
    months.push(date.toLocaleString(locale, options));
  }
  return months;
}
