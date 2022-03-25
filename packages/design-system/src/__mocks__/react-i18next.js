/* eslint-disable */
const reactI18next = jest.genMockFromModule('react-i18next');
const React = require('react');

function t(key, params) {
  const paramString = params ? ` | ${JSON.stringify(params)}` : '';
  return `${key}${paramString}`;
}

reactI18next.withTranslation = () => (Component) => (props) => <Component t={t} {...props} />;
reactI18next.useTranslation = () => ({ t });

reactI18next.I18nextProvider = (props) => <div {...props}></div>;

module.exports = reactI18next;
