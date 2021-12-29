// change which directories are used for stories based on environment variable
const getPathForStories = () => {
  let projectDirectory;
  switch (process.env.STORYBOOK_DS) {
    case 'mgov':
      projectDirectory = '@(ds-medicare-gov|design-system)';
      break;
    case 'hcgov':
      projectDirectory = '@(ds-healthcare-gov|design-system)';
      break;
    default:
      projectDirectory = 'design-system';
  }
  return [
    `../packages/${projectDirectory}/**/*.stories.mdx`,
    `../packages/${projectDirectory}/**/*.stories.@(js|jsx|ts|tsx)`,
  ];
};

const getStaticDirs = () => {
  const staticDirs = ['../packages/design-system/src'];
  switch (process.env.STORYBOOK_DS) {
    case 'mgov':
      staticDirs.push('../packages/ds-medicare-gov/src');
      break;
    case 'hcgov':
      staticDirs.push('../packages/ds-healthcare-gov/src');
      break;
  }
  return staticDirs;
};

module.exports = {
  stories: getPathForStories(),
  staticDirs: getStaticDirs(),
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html',
  ],
};
