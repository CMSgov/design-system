/* eslint-disable */
const i18next = jest.genMockFromModule('react-i18next');
const React = require('react');

function t(key, params) {
  const paramString = params ? ` | ${JSON.stringify(params)}` : '';
  return `${key}${paramString}`;
}

i18next.translate = () => (Component) => (props) => (
  <Component t={t} {...props} />
);

i18next.use = () => ({
  init: jest.fn(),
});

module.exports = i18next;
