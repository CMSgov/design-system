/**
 * The server task starts a Browsersync server to enable previewing the
 * documentation site locally (localhost:3000). Browsersync enables live reloads,
 * form replication, and click mirroring. Open the documentation site in
 * multiple tabs to see for yourself.
 */
module.exports = (gulp, shared) => {
  gulp.task('server', () => {
    shared.browserSync.init({
      files: ['./docs/*.html'], // CSS + JS watching is handled by Gulp
      server: {
        baseDir: './docs'
      },
      notify: false,
      open: false,
    });
  });
};
