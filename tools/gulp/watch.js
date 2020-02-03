/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const dutil = require('./common/log-util');
const packagesRegex = require('./common/packagesRegex');

module.exports = (gulp, shared) => {
  gulp.task('watch:packages', () => {
    const packages = packagesRegex(shared.packages);

    // Documentation dependencies
    gulp.watch(['packages/core/src/images/*'], gulp.series('docs:images'));

    // Sass files
    gulp.watch(
      `packages/${packages}/src/**/*.scss`,
      gulp.series('sass:process:docs', 'docs:generate-pages')
    );

    // HTML/EJS examples
    gulp.watch(`packages/**/src/**/*.example.{ejs,html}`, gulp.series('docs:generate-pages'));

    // React components and examples
    gulp.watch(
      [`packages/${packages}/src/**/*.{js,jsx}`, `!packages/${packages}/src/**/*.test.{js,jsx}`],
      gulp.series('docs:react', 'docs:generate-pages')
    );
  });

  gulp.task('watch:docs', done => {
    gulp.watch('packages/docs/src/styles/**/*.scss', gulp.series('sass:process:docs'));
    gulp.watch('packages/docs/src/pages/**/*.md', gulp.series('docs:generate-pages'));
    // Support Markdown documentation pages nested within a theme's directory
    gulp.watch('packages/themes/*/src/pages/**/*.md', gulp.series('docs:generate-pages'));
    done();
  });

  gulp.task('watch', seriesDone => {
    dutil.logMessage('👀 ', 'Transpiling + watching files for future changes');
    return gulp.series(
      'build:dev',
      gulp.parallel('server', 'watch:packages', 'watch:docs'),
      done => {
        seriesDone();
        done();
      }
    )();
  });
};
