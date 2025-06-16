import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/react-webpack5';

const extensionGlob = '*.stories.@(js|jsx|ts|tsx)';

const config: StorybookConfig = {
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('storybook-addon-fetch-mock'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
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
      // Following options are inlined from Storybook's internal defaults (v8.0.5),
      // since the `typescript` preset function is no longer safely importable in 8.6.1+
      // Source: https://github.com/storybookjs/storybook/blob/v8.0.5/code/lib/core-server/src/presets/common-preset.ts#L135-L146
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      savePropValueAsString: true,
      // Added manually to reduce VRT diff noise in union types.
      shouldSortUnions: true,
    },
  },
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  docs: {},
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
