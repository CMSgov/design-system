module.exports = {
  features: {
    postcss: false,
  },
  stories: [
    '../packages/design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/ds-healthcare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/ds-medicare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  staticDirs: ['../packages/design-system/src'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html',
  ],
};
