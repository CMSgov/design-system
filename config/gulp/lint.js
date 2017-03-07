const argv = require('yargs').argv;
const count = require('gulp-count');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const stylelintConfig = require('../../stylelint.config');

/**
 * Class naming pattern
 * ~~~~~~~~~~~~~~~~~~~
 * Namespaced with: ds-
 * Followed by a prefix: l- c- u- is- has-
 * Followed by BEM syntax: [BLOCK]__[ELEMENT]--[MODIFIER]
 * Examples: .ds-c-button--primary, .ds-c-card__title, .ds-u-text-underlined
 */
const systemNamePattern = /^(ds-)(l|c|u|is|has|)(-[a-z0-9]+)((--?|__)[a-z0-9]+)*$/;

module.exports = (gulp) => {
  // Lint Sass files using stylelint. Further configuration for CSS linting
  // can be handled in stylelint.config.js
  function lintSass(cwd, enforceNamePattern = true) {
    let config = stylelintConfig;

    if (enforceNamePattern) {
      config = Object.assign({}, config);
      config.rules['selector-class-pattern'] = systemNamePattern;
    }

    return gulp
      .src([`${cwd}src/**/*.scss`])
      .pipe(stylelint({
        config: config,
        failAfterError: argv.env && argv.env === 'test',
        reporters: [
          { formatter: 'string', console: true },
        ],
        syntax: 'scss',
      }))
      .pipe(count('## Sass files linted'));
  }

  gulp.task('lint:core-styles', () => lintSass('packages/core/'));
  gulp.task('lint:docs-styles', () => lintSass('packages/docs/', false));

  gulp.task('lint:core-scripts', () => {
    return gulp.src([
      'packages/core/src/**/*.js',
      'packages/core/src/**/*.jsx',
      '!src/vendor/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(count('## system JS files linted'));
  });

  gulp.task('lint:docs-scripts', () => {
    return gulp.src([
      'packages/docs/src/**/*.js',
      'packages/docs/src/**/*.jsx'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(count('## docs JS files linted'));
  });

  gulp.task('lint:core', ['lint:core-scripts', 'lint:core-styles']);
  gulp.task('lint:docs', ['lint:docs-scripts', 'lint:docs-styles']);

  gulp.task('lint', ['lint:core', 'lint:docs']);
};
