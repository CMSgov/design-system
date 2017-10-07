const _ = require('lodash');
const changedInPlace = require('gulp-changed-in-place');
const count = require('gulp-count');
const packagesRegex = require('./common/packagesRegex');
const stylelint = require('gulp-stylelint');
const stylelintConfig = require('../../stylelint.config');

/**
 * Class naming pattern
 * ~~~~~~~~~~~~~~~~~~~~
 * Names:    ds-
 * Prefixes: l- c- u- is- has-
 * Pattern:  [NAMESPACE]-[PREFIX]-[BLOCK]__[ELEMENT]--[MODIFIER]
 * Examples: .ds-c-button--primary, .ds-c-card__title, .ds-u-text-underlined
 */
const systemNamePattern = /^(ds-)(l|c|u|is|has|)(-[a-z0-9]+)((--?|__)[a-z0-9]+)*$/;

module.exports = (gulp, shared) => {
  const failAfterError = shared.env && shared.env === 'test';
  const packages = packagesRegex(shared.packages);

  // Lint Sass files using stylelint. Further configuration for CSS linting
  // can be handled in stylelint.config.js
  function runStylelint(cwd, enforceNamePattern = true) {
    const config = _.cloneDeep(stylelintConfig);

    if (enforceNamePattern) {
      if (!config.hasOwnProperty('rules')) config.rules = {};
      config.rules['selector-class-pattern'] = systemNamePattern;
    }

    return gulp
      .src([`${cwd}src/**/*.scss`])
      .pipe(changedInPlace({ firstPass: true }))
      .pipe(
        stylelint({
          config: config,
          failAfterError: failAfterError,
          reporters: [{ formatter: 'string', console: true }],
          syntax: 'scss'
        })
      )
      .pipe(count('## Sass files linted'));
  }

  gulp.task('lint:packages', () => runStylelint(`packages/${packages}/`));
  gulp.task('lint:docs', () => runStylelint('packages/docs/', false));

  gulp.task('lint', ['lint:packages', 'lint:docs']);
};
