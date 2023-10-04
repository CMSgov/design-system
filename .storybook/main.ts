import type { StorybookConfig } from '@storybook/react-webpack5';

const extensionGlob = '*.stories.@(js|jsx|ts|tsx|mdx)';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-viewport',
  ],
  features: {
    buildStoriesJson: true,
  },
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" type="text/css" title="themeCss" href="core-theme.css" />
  `,
  stories: [
    `../packages/design-system/src/**/${extensionGlob}`,
    `../packages/ds-healthcare-gov/src/**/${extensionGlob}`,
    `../packages/ds-medicare-gov/src/**/${extensionGlob}`,
    `../packages/docs/content/**/${extensionGlob}`,
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
