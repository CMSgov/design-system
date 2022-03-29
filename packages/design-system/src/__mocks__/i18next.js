/* eslint-disable */
const i18next = jest.genMockFromModule('i18next');

i18next.createInstance = jest.fn(() => i18next);
i18next.use = jest.fn(() => i18next);
i18next.init = jest.fn();
i18next.addResourceBundle = jest.fn();
i18next.changeLanguage = jest.fn();
i18next.language = 'en';
i18next.t = function (key, params) {
  const paramString = params ? ` | ${JSON.stringify(params)}` : '';
  return `${key}${paramString}`;
};

export default i18next;
