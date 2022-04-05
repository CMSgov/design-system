/**
 * Gets the directories used for this project based on STORYBOOK_DS environment variable
 */
const getSrcDirectories = () => {
  let projectDirs;
  switch (process.env.STORYBOOK_DS) {
    case 'mgov':
      projectDirs = ['../packages/design-system/src', '../packages/ds-medicare-gov/src'];
      break;
    case 'hcgov':
      projectDirs = ['../packages/design-system/src', '../packages/ds-healthcare-gov/src'];
      break;
    default:
      projectDirs = ['../packages/design-system/src'];
  }
  return projectDirs;
};

const getStaticDirectoryPaths = () => {
  let projectDirs;
  switch (process.env.STORYBOOK_DS) {
    case 'mgov':
      projectDirs = [
        {
          from: '../packages/design-system/src/fonts',
          to: '/core/fonts',
        },
        {
          from: '../packages/design-system/src/images',
          to: '/core/images',
        },
        {
          from: '../packages/ds-medicare-gov/src/fonts',
          to: 'mgov/fonts',
        },
        {
          from: '../packages/ds-medicare-gov/src/images',
          to: 'mgov/images',
        },
      ];
      break;
    case 'hcgov':
      projectDirs = ['../packages/design-system/src', '../packages/ds-healthcare-gov/src'];
      break;
    default:
      projectDirs = ['../packages/design-system/src'];
  }
  return projectDirs;
};

const getPathsForStories = () =>
  getSrcDirectories().map((dir) => `${dir}/**/*.stories.@(js|jsx|ts|tsx|mdx)`);

module.exports = {
  stories: getPathsForStories(),
  staticDirs: getStaticDirectoryPaths(),
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html',
  ],
};
