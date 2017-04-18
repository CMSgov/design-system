const _ = require('lodash');
const changedInPlace = require('gulp-changed-in-place');
const count = require('gulp-count');
const eslint = require('gulp-eslint');
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
  // Lint Sass files using stylelint. Further configuration for CSS linting
  // can be handled in stylelint.config.js
  function runStylelint(cwd, enforceNamePattern = true) {
    let config = _.cloneDeep(stylelintConfig);

    if (enforceNamePattern) {
      config.rules['selector-class-pattern'] = systemNamePattern;
    }

    return gulp
      .src([`${cwd}src/**/*.scss`])
      .pipe(changedInPlace({ firstPass: true }))
      .pipe(stylelint({
        config: config,
        failAfterError: shared.env && shared.env === 'test',
        reporters: [
          { formatter: 'string', console: true }
        ],
        syntax: 'scss'
      }))
      .pipe(count('## Sass files linted'));
  }

  function runEslint(src, name) {
    return gulp.src(src)
      .pipe(changedInPlace({ firstPass: true }))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(count(`## ${name} JS files linted`));
  }

  gulp.task('lint:core-styles', () => runStylelint('packages/core/'));
  gulp.task('lint:docs-styles', () => runStylelint('packages/docs/', false));

  gulp.task('lint:core-scripts', () => runEslint([
    'packages/core/src/**/*.{js,jsx}',
    '!src/vendor/**/*.js'
  ], 'core'));

  gulp.task('lint:docs-scripts', () => runEslint([
    'packages/docs/src/**/*.{js,jsx}'
  ], 'docs'));

  gulp.task('lint:core', ['lint:core-scripts', 'lint:core-styles']);
  gulp.task('lint:docs', ['lint:docs-scripts', 'lint:docs-styles']);

  gulp.task('lint', ['lint:core', 'lint:docs']);
};
