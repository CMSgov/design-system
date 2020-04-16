const _ = require('lodash');
const count = require('gulp-count');
const changedInPlace = require('gulp-changed-in-place');
const eslint = require('gulp-eslint');
const eslintConfig = require('../eslint.config');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const path = require('path');
const stylelint = require('gulp-stylelint');
const stylelintConfig = require('../stylelint.config');
const getPackageName = require('./common/getPackageName');
const streamPromise = require('./common/streamPromise');
const { logTask } = require('./common/logUtil');
const { CORE_SOURCE_PACKAGE } = require('./common/constants');

/**
 * Class naming pattern
 * ~~~~~~~~~~~~~~~~~~~~
 * Names:    ds-
 * Prefixes: l- c- u-
 * Pattern:  [NAMESPACE]-[PREFIX]-[BLOCK]__[ELEMENT]--[MODIFIER]
 * Examples: .ds-c-button--primary, .ds-c-card__title, .ds-u-text-underlined
 */
const coreSassClassNamingPattern = /^(ds-)(l|c|u|)(-[a-z0-9]+)((--?|__)[a-z0-9]+)*$/;

// Lint Sass files using stylelint
async function lintSass(dir, fix) {
  const src = path.join(dir, 'src');
  const config = _.cloneDeep(stylelintConfig);
  const configBasedir = path.resolve(__dirname, '../node_modules');

  // Add class naming pattern linting for core DS
  const name = await getPackageName(dir);
  if (name === CORE_SOURCE_PACKAGE) {
    _.set(config, ['rules', 'selector-class-pattern'], coreSassClassNamingPattern);
  }

  return streamPromise(
    gulp
      .src([`${src}/**/*.scss`, `!${src}/**/*.docs.scss}`])
      .pipe(changedInPlace({ firstPass: true }))
      .pipe(count(`## Sass files linted in ${src}`))
      .pipe(
        stylelint({
          config,
          configBasedir,
          fix,
          failAfterError: process.env.NODE_ENV === 'test',
          reporters: [{ formatter: 'string', console: true }],
          syntax: 'scss'
        })
      )
    // TODO: Figure out why stylelint fix is causing the task to end early
    // .pipe(gulpIf(fix, gulp.dest(src)))
  );
}

// Lint JS files using eslint
async function lintJS(dir, fix) {
  // Taken from gulp-eslint example
  // https://github.com/adametry/gulp-eslint/blob/master/example/fix.js
  const isFixed = file => {
    return file.eslint != null && file.eslint.fixed;
  };

  const src = path.join(dir, 'src');
  return streamPromise(
    gulp
      .src([`${src}/**/*.{js,jsx}`, `!${src}/**/*.test.{js,jsx}`])
      .pipe(count(`## JS files linted in ${src}`))
      .pipe(eslint({ ...{ fix }, ...eslintConfig }))
      .pipe(eslint.format())
      .pipe(gulpIf(isFixed, gulp.dest(src)))
      .pipe(gulpIf(process.env.NODE_ENV === 'test', eslint.failAfterError()))
  );
}

module.exports = {
  async lintDirectories(directories, fix) {
    logTask('🔎 ', `Linting "src" directory in: ${directories.join(', ')}`);
    // TODO: Fix failAfterError with streams
    await Promise.all(
      directories.map(async dir => {
        await lintSass(dir, fix);
        await lintJS(dir, fix);
      })
    );
  }
};
