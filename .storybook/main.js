const env = process.env.STORYBOOK_DS ?? 'core';

let storyList = ['../packages/design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'];
if (env === 'healthcare' || env === 'all')
  storyList.push('../packages/ds-healthcare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)');
if (env === 'medicare' || env === 'all')
  storyList.push('../packages/ds-medicare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)');

module.exports = {
  features: {
    postcss: false,
  },
  stories: storyList,
  staticDirs: ['../packages/design-system/src'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html',
  ],
};
