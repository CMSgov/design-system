import type { StorybookConfig } from '@storybook/react-webpack5';

const usePreact = Boolean(process.env.PREACT && JSON.parse(process.env.PREACT));

const extensionGlob = '*.stories.@(js|jsx|ts|tsx|mdx)';
const directoryGlob = usePreact ? '**' : '!(web-components)/**';

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
    `../packages/design-system/src/${directoryGlob}/${extensionGlob}`,
    `../packages/ds-healthcare-gov/src/${directoryGlob}/${extensionGlob}`,
    `../packages/ds-medicare-gov/src/${directoryGlob}/${extensionGlob}`,
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
  docs: {
    autodocs: true,
  },
};

export default config;
