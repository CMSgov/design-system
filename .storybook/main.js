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

module.exports = {
  stories: getPathForStories(),
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html',
  ],
};
