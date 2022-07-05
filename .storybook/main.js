module.exports = {
  stories: [
    '../packages/design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/ds-healthcare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/ds-medicare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  staticDirs: [
    '../packages/design-system/src',
    '../packages/ds-healthcare-gov/src',
    '../packages/ds-medicare-gov/src',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html',
  ],
};
