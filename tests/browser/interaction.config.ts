/**
 * This config sets up interaction VRT tests in the codebase, we only need to
 * change the testDir and testMap keys in the main playwright config.
 */

import { default as pwc } from './playwright.config';

pwc.testDir = '../../packages/';
pwc.testMatch = /.*test\.interaction\.ts/;

export default pwc;
