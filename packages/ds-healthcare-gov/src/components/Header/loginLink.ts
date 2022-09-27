import { TFunction } from '@cmsgov/design-system';

/**
 * Returns a link pointing to the login page
 * @param {Function} translate - i18n translator
 * @param {Boolean} deConsumer - is the consumer coming from a Direct Enrollment flow?
 * @param {String} primaryDomain
 * @returns {Object}
 */
export default function loginLink(t: TFunction, deConsumer?: boolean, primaryDomain = '') {
  return {
    label: t('header.login'),
    href: deConsumer ? `${primaryDomain}/login?check_de=1` : `${primaryDomain}/login`,
  };
}
