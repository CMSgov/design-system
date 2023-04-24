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
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" type="text/css" title="themeCss" href="core-theme.css" />
  `,
  stories,
  staticDirs: ['./static/'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
};
