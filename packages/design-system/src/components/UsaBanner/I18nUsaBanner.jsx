/* eslint-disable filenames/match-exported */
import { I18nextProvider } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import UsaBanner from './UsaBanner';
import i18n from '../i18n';

/**
 * A container component responsible for passing an instance
 * of i18next to all child components using react-i18next's
 * `translate` HOC. Note that we use I18nextProvider in order
 * to avoid conflicts with other apps using react-i18next.
 * See https://github.com/i18next/react-i18next/issues/382 for
 * more context on why we need to do it this way.
 */
const I18nUsaBanner = function (props) {
  return (
    <I18nextProvider i18n={i18n} initialLanguage={props.initialLanguage}>
      <UsaBanner {...props} />
    </I18nextProvider>
  );
};

I18nUsaBanner.defaultProps = {
  initialLanguage: 'en',
};

I18nUsaBanner.propTypes = {
  initialLanguage: PropTypes.oneOf(['en', 'es']),
};

export default I18nUsaBanner;
export { I18nUsaBanner as UsaBanner };
