// Slugify config borrowed from Loki source code:
// https://github.com/oblador/loki/blob/8beda16fcda4841c4e23c7353880e94498cbadcc/packages/runner/src/commands/test/get-output-paths.js
const { slugify } = require('transliteration');

const SLUGIFY_OPTIONS = {
  lowercase: false,
  separator: '_',
  allowedChars: 'a-zA-Z0-9',
};

const { LOKI_FILE_PREFIX } = process.env;
const filePrefix = LOKI_FILE_PREFIX ? LOKI_FILE_PREFIX + ' ' : '';

// This is basically the default Loki formatter but modified for child design systems
const fileNameFormatter = ({ configurationName, kind, story }) =>
  slugify(`${filePrefix}${configurationName} ${kind} ${story}`, SLUGIFY_OPTIONS);

module.exports = {
  chromeSelector: '#root > div > *',
  fileNameFormatter,
  configurations: {
    'chrome.laptop': {
      target: process.env.CI ? 'chrome.app' : 'chrome.docker',
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false,
    },
    'chrome.iphone7': {
      target: process.env.CI ? 'chrome.app' : 'chrome.docker',
      preset: 'iPhone 7',
    },
  },
};
