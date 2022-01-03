/**
 * Returns a link pointing to the opposite locale
 * @param {Function} translate - i18n translator
 * @param {String} locale
 * @param {String} switchLocaleLink - overrides the default locale link
 * @param {String} subpath
 * @returns {Object}
 */
export default function (t, locale, subpath = '', switchLocaleLink) {
  const defaultLocaleLink =
    locale === 'es'
      ? `https://www.healthcare.gov/${subpath}`
      : `https://www.cuidadodesalud.gov/es/${subpath}`;
  return {
    label: locale === 'es' ? t('header.english') : t('header.español'),
    href: switchLocaleLink || defaultLocaleLink,
  };
}
