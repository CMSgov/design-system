module.exports = {
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
