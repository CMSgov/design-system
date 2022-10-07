/**
 * setupTests.js
 */

import '@testing-library/jest-dom/extend-expect';

// following Jest's recommendation: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated
  removeListener: jest.fn(), // Deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

window.scroll = () => {};
window.scrollTo = () => {};

const localStorageMock = (function () {
  return {
    getItem: jest.fn((itemName) => (itemName === 'CMS_DS_IT_LAST_ACTIVE' ? 1643811720 : null)),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
