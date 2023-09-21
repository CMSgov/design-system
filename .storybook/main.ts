import type { StorybookConfig } from '@storybook/react-webpack5';

const usePreact = Boolean(process.env.PREACT && JSON.parse(process.env.PREACT));

const extensionGlob = '*.stories.@(js|jsx|ts|tsx|mdx)';
const directoryGlob = usePreact ? '**' : '**/!(web-components)/**';

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
    // ...(usePreact
    //   ? []
    //   : [
    //       `!../packages/design-system/src/components/web-components/*`,
    //       `!../packages/ds-healthcare-gov/src/components/web-components/*`,
    //       `!../packages/ds-medicare-gov/src/components/web-components/*`,
    //     ]),
  ],
  staticDirs: ['./static/'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  // babel: async (options) => ({
  //   ...options,
  //   plugins: [
  //     [
  //       'module-resolver',
  //       {
  //         alias: {
  //           react: 'preact/compat',
  //           'react-dom': 'preact/compat',
  //           'react/jsx-runtime': 'preact/jsx-runtime',
  //         },
  //       },
  //     ],
  //   ],
  //   // presets: [["@babel/typescript", { jsxPragma: "h" }]], Don't think we need this
  // }),
  docs: {
    autodocs: true,
  },
};

export default config;
