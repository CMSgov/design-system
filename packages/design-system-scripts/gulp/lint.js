const _ = require('lodash');
const gulp = require('gulp');
const changedInPlace = require('gulp-changed-in-place');
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
const systemNamePattern = /^(ds-)(l|c|u|)(-[a-z0-9]+)((--?|__)[a-z0-9]+)*$/;

// Lint Sass files using stylelint. Further configuration for CSS linting
// can be handled in stylelint.config.js
async function lintSass(dir) {
  const src = path.join(dir, 'src');
  const config = _.cloneDeep(stylelintConfig);

  // Add class naming pattern linting for core DS
  const name = await getPackageName(dir);
  if (name === CORE_SOURCE_PACKAGE) {
    _.set(config, ['rules', 'selector-class-pattern'], systemNamePattern);
  }

  return streamPromise(
    gulp
      .src([`${src}/**/*.scss`, `!${src}/**/*.docs.scss}`])
      .pipe(changedInPlace({ firstPass: true }))
      .pipe(
        stylelint({
          config,
          failAfterError: process.env.NODE_ENV === 'test',
          reporters: [{ formatter: 'string', console: true }],
          syntax: 'scss'
        })
      )
  );
}

module.exports = {
  async lintDirectories(directories) {
    logTask('🔎 ', `Linting "src" directory in: ${directories.join(', ')}`);

    await directories.reduce((p, dir) => {
      return p.then(() => lintSass(dir));
    }, Promise.resolve());
  }
};
