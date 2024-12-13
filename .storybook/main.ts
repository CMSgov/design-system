import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/react-webpack5';
import { typescript as typescriptPresets } from '@storybook/core-server/dist/presets/common-preset';

const extensionGlob = '*.stories.@(js|jsx|ts|tsx)';

const config: StorybookConfig = {
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-viewport'),
    'storybook-addon-fetch-mock',
    '@storybook/addon-webpack5-compiler-babel',
  ],
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
  staticDirs: ['../packages/design-system-tokens/dist/css-vars'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      ...typescriptPresets().reactDocgenTypescriptOptions,
      shouldSortUnions: true,
    },
  },
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
