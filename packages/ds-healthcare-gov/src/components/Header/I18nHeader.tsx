import Header, { HeaderProps } from './Header';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import i18n from '../i18n';

/**
 * A container component responsible for passing an instance
 * of i18next to all child components using react-i18next's
 * `withTranslation` HOC. Note that we use I18nextProvider in order
 * to avoid conflicts with other apps using react-i18next.
 * See https://github.com/i18next/react-i18next/issues/382 for
 * more context on why we need to do it this way.
 */
const I18nHeader = (props: HeaderProps) => (
  <I18nextProvider i18n={i18n}>
    <Header {...props} />
  </I18nextProvider>
);

export default I18nHeader;
export { I18nHeader as Header };
