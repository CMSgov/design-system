import type { StorybookConfig } from '@storybook/react-webpack5';

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
    '../packages/design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/ds-healthcare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/ds-medicare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../packages/docs/content/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  staticDirs: ['./static/'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  babel: async (options) => ({
    ...options,
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            react: 'preact/compat',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime',
          },
        },
      ],
    ],
    // presets: [["@babel/typescript", { jsxPragma: "h" }]], Don't think we need this
  }),
  docs: {
    autodocs: true,
  },
};

export default config;
