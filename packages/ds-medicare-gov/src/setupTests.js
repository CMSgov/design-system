/**
 * setupTests.js
 *
 * Setup for running tests with `@cmsgov/design-system-scripts`, this file is run before each test file
 * This file must be located at the root of the directory where `yarn test` is being run, usually this is `src/setupTests.js`
 *
 * `@cmsgov/design-system-scripts` supports 2 options for component testing
 * Based off create-react-app's testing documentation - https://create-react-app.dev/docs/running-tests/#testing-components
 */

// Option 1: Enzyme for React 16
// import Adapter from 'enzyme-adapter-react-16';
// import { configure } from 'enzyme';
// configure({ adapter: new Adapter() });

// Option 2: React Testing Library
import "@testing-library/jest-dom/extend-expect";
