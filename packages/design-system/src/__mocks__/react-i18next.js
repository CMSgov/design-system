/* eslint-disable */
const i18next = require('./i18next').default;
const reactI18next = jest.genMockFromModule('react-i18next');
const React = require('react');

const t = i18next.t;

reactI18next.withTranslation = () => (Component) => (props) => <Component t={t} {...props} />;
reactI18next.useTranslation = () => ({ t });

reactI18next.I18nextProvider = (props) => <div {...props}></div>;

module.exports = reactI18next;
