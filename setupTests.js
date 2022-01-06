/**
 * setupTests.js
 *
 * Setup for running tests with `@cmsgov/design-system-scripts`, this file is run before each test file
 */

// Enzyme for React 16
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import '@testing-library/jest-dom/extend-expect';
configure({ adapter: new Adapter() });

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
