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

const getLinterConfig = async (dir, originalConfig, additionalCoreRules) => {
  const config = _.cloneDeep(originalConfig);

  // Add addition linting rules for core DS
  const name = await getPackageName(dir);
  if (name === CORE_SOURCE_PACKAGE) {
    _.set(config, 'rules', { ...config.rules, ...additionalCoreRules });
  }

  return config;
};

/**
 * Class naming pattern for the core design system
 * ~~~~~~~~~~~~~~~~~~~~
 * Names:    ds-
 * Prefixes: l- c- u-
 * Pattern:  [NAMESPACE]-[PREFIX]-[BLOCK]__[ELEMENT]--[MODIFIER]
 * Examples: .ds-c-button--primary, .ds-c-card__title, .ds-u-text-underlined
 */
const coreStyleLintRules = {
  'selector-class-pattern': /^(ds-)(l|c|u|)(-[a-z0-9]+)((--?|__)[a-z0-9]+)*$/
};

// Lint Sass files using stylelint
async function lintSass(dir, fix) {
  const src = path.join(dir, 'src');
  const config = await getLinterConfig(dir, stylelintConfig, coreStyleLintRules);
  const configBasedir = path.resolve(__dirname, '../node_modules');

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
      .pipe(gulp.dest(src))
  );
}

// Taken from gulp-eslint example
// https://github.com/adametry/gulp-eslint/blob/master/example/fix.js
const isFixed = file => {
  return file.eslint != null && file.eslint.fixed;
};

// Additional eslint rules for the core design system
const coreEsLintRules = {
  // Avoid exploits. If you need dangerouslySetInnerHTML, then temporarily
  // disable this rule in the script rather than removing it from here.
  'react/no-danger': 'error'
};

// Lint JS files using eslint
async function lintJS(dir, fix) {
  const src = path.join(dir, 'src');
  const config = await getLinterConfig(dir, eslintConfig, coreEsLintRules);

  return streamPromise(
    gulp
      .src([`${src}/**/*.{js,jsx}`])
      .pipe(count(`## JS files linted in ${src}`))
      .pipe(eslint({ ...{ fix }, ...config }))
      .pipe(eslint.format())
      .pipe(gulpIf(isFixed, gulp.dest(src)))
      .pipe(gulpIf(process.env.NODE_ENV === 'test', eslint.failAfterError()))
  );
}

module.exports = {
  async lintDirectories(directories, fix) {
    logTask('🔎 ', `Linting "src" directory in: ${directories.join(', ')}`);

    await Promise.all(
      directories.map(async dir => {
        await lintSass(dir, fix);
        await lintJS(dir, fix);
      })
    );
  }
};
