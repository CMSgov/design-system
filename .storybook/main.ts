import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-mdx-gfm'],
  features: {
    buildStoriesJson: true,
  },
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" type="text/css" title="themeCss" href="styles/core-theme.css" />
  `,
  stories: [
    '../packages/design-system/src/**/*.stories.@([jt]sx)',
    '../packages/ds-healthcare-gov/src/**/*.stories.@([jt]sx)',
    '../packages/ds-medicare-gov/src/**/*.stories.@([jt]sx)',
  ],
  staticDirs: ['./static/'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
