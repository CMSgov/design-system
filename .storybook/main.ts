import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-mdx-gfm'],
  features: {
    buildStoriesJson: true,
  },
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" type="text/css" title="themeCss" href="core-theme.css" />
  `,
  stories: ['../packages/*/(src|content)/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
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
