/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const { logTask } = require('./common/logUtil');

module.exports = (gulp, shared) => {
  const { docsPath, srcPath } = shared;

  gulp.task('watch:src', () => {
    // Images
    gulp.watch([`${srcPath}/images/*`], gulp.series('docs:images'));

    // Sass files
    gulp.watch(`${srcPath}/**/*.scss`, gulp.series('sass:docs', 'docs:generate-pages'));

    // HTML/EJS examples
    gulp.watch(`${srcPath}/**/*.example.{ejs,html}`, gulp.series('docs:generate-pages'));

    // React components and examples
    gulp.watch(
      [`${srcPath}/**/*.{js,jsx}`, `!${srcPath}/**/*.test.{js,jsx}`],
      gulp.series('docs:react', 'docs:generate-pages')
    );
  });

  gulp.task('watch:docs', done => {
    gulp.watch(`${docsPath}/src/styles/**/*.scss`, gulp.series('sass:docs'));
    gulp.watch(`${docsPath}/src/pages/**/*.md`, gulp.series('docs:generate-pages'));
    done();
  });

  gulp.task('watch', seriesDone => {
    logTask('👀 ', 'Transpiling + watching files for future changes');
    return gulp.series('build:dev', gulp.parallel('server', 'watch:src', 'watch:docs'), done => {
      seriesDone();
      done();
    })();
  });
};
