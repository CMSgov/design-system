const browserSync = require('browser-sync').create();

module.exports = (gulp) => {
  gulp.task('watch', ['build'], () => {
    // Start a BrowserSync server
    browserSync.init({
      server: {
        baseDir: './docs'
      },
      notify: false,
      open: false,
    });

    // Trigger tasks when certain files change
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch(['src/scripts/**/*.js', 'src/scripts/**/*.jsx'], ['javascript']);
    gulp.watch('docs/**/*.html').on('change', browserSync.reload);
  });
};
