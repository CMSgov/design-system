const env = process.env.STORYBOOK_DS ?? 'core';

let statics = ['../packages/design-system/src'];
let storyList = ['../packages/design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'];

// child systems have their system-specific stories included
if (env === 'healthcare') {
  storyList.push('../packages/ds-healthcare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)');
}
if (env === 'medicare') {
  storyList.push('../packages/ds-medicare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)');
}
// gatsby has it's own way of handling static assets
// but requires all stories available for inclusion as iframes
if (env === 'gatsby') {
  storyList.push('../packages/ds-healthcare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)');
  storyList.push('../packages/ds-medicare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)');
}

module.exports = {
  features: {
    buildStoriesJson: true,
    postcss: false,
  },
  stories: storyList,
  staticDirs: statics,
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html',
  ],
};
