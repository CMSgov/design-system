const stories = [
  '../packages/design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  '../packages/ds-healthcare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  '../packages/ds-medicare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
];

module.exports = {
  features: {
    buildStoriesJson: true,
    postcss: false,
  },
  stories,
  staticDirs: ['../packages/design-system/src'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
