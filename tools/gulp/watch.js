/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const dutil = require('./common/log-util');
const runSequence = require('run-sequence');
const packagesRegex = require('./common/packagesRegex');

module.exports = (gulp, shared) => {
  gulp.task('watch:packages', () => {
    const packages = packagesRegex(shared.packages);

    // Documentation dependencies
    gulp.watch(['packages/core/src/images/*'], ['docs:images']);

    // Sass files
    gulp.watch(`packages/${packages}/src/**/*.scss`, [
      'sass:process:docs',
      'docs:generate-pages'
    ]);

    // HTML/EJS examples
    gulp.watch(`packages/**/src/**/*.example.{ejs,html}`, [
      'docs:generate-pages'
    ]);

    // React components, examples, and tests
    gulp.watch([
      `packages/${packages}/src/**/*.{js,jsx}`,
      `!packages/${packages}/src/**/*.example.{js,jsx}`,
      `!packages/${packages}/src/**/*.test.{js,jsx}`
    ], ['lint:packages-scripts', 'docs:react']);
  });

  gulp.task('watch:docs', () => {
    gulp.watch('packages/docs/src/styles/**/*.scss', [
      'sass:process:docs'
    ]);

    gulp.watch('packages/docs/src/pages/**/*.md', [
      'docs:generate-pages'
    ]);

    gulp.watch([
      'packages/docs/src/scripts/**/*.{js,jsx}'
    ], ['lint:docs-scripts']);
  });

  gulp.task('watch', () => {
    dutil.logMessage(
      '👀 ',
      'Transpiling + watching files for future changes'
    );

    runSequence(
      'docs:build',
      'sass:process:docs',
      [
        'server',
        'watch:packages',
        'watch:docs'
      ]
    );
  });
};
