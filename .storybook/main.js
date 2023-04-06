const stories = [
  '../packages/design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  '../packages/ds-healthcare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  '../packages/ds-medicare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
];
module.exports = {
  features: {
    buildStoriesJson: true,
    postcss: false,
    babelModeV7: true,
  },
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" type="text/css" title="themeCss" href="core-theme.css" />
  `,
  stories,
  staticDirs: ['./static/', '../packages/design-system/src'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
