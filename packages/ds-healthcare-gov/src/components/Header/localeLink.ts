import { Language, TFunction, languageMatches } from '@cmsgov/design-system';

/**
 * Returns a link pointing to the opposite locale
 */
export default function localeLink(
  t: TFunction,
  locale: Language,
  subpath = '',
  switchLocaleLink?: string
) {
  const defaultLocaleLink = languageMatches(locale, 'es')
    ? `https://www.healthcare.gov/${subpath}`
    : `https://www.cuidadodesalud.gov/es/${subpath}`;
  return {
    label: languageMatches(locale, 'es') ? t('header.english') : t('header.español'),
    href: switchLocaleLink ?? defaultLocaleLink,
  };
}
