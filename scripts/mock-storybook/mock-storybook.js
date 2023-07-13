const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

const storyGlobs = [
  './packages/design-system/src/components/Dropdown/*stories.@(js|jsx|ts|tsx|mdx)',
  './packages/design-system/src/components/Tabs/*stories.@(js|jsx|ts|tsx|mdx)',
  // './packages/design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  // './packages/ds-healthcare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  // './packages/ds-medicare-gov/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  // './packages/docs/content/**/*.stories.@(js|jsx|ts|tsx|mdx)',
];

const storybookAliases = {
  '@storybook/addon-actions': './scripts/mock-storybook/mocks/addon-actions',
  '@storybook/preview-api': './scripts/mock-storybook/mocks/preview-api',
};
const babelConfig = {
  presets: [['@babel/preset-env', { modules: false }]],
  plugins: [['module-resolver', { alias: storybookAliases }]],
};

function cb() {
  console.log('done');
}

gulp
  .src(storyGlobs)
  .pipe(babel(babelConfig))
  .on('error', (error) => {
    log.error('there was an error transpiling: ' + error);
  })
  .pipe(
    rename((path) => {
      path.extname = '.embed' + path.extname;
      return path;
    })
  )
  .pipe(gulp.dest((file) => file.dirname))
  .on('end', cb);
