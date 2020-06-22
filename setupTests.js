/**
 * setupTests.js
 *
 * Setup for running tests with `@cmsgov/design-system-scripts`, this file is run before each test file
 */

// Enzyme for React 16
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });
