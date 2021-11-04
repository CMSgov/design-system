/* eslint-disable */
const i18next = jest.genMockFromModule('i18next');

function t(key, params) {
  const paramString = params ? ` | ${JSON.stringify(params)}` : '';
  return `${key}${paramString}`;
}

i18next.use = () => ({
  init: jest.fn(),
});

i18next.createInstance = (options, callback) => {
  callback(null, t);
};

export default i18next;
