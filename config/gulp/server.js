const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackStatsConfig = require('./common/webpackStatsConfig');

/**
 * The server task starts a Browsersync server to enable previewing the
 * documentation site locally (localhost:3000). Browsersync enables live reloads,
 * form replication, and click mirroring. Open the documentation site in
 * multiple tabs to see for yourself.
 */
module.exports = (gulp, shared) => {
  gulp.task('server', () => {
    const bundler = webpack(shared.webpackConfig);

    shared.browserSync.init({
      files: ['./docs/*.html'], // CSS + JS watching is handled by Gulp
      server: {
        baseDir: 'docs',
        middleware: [
          webpackDevMiddleware(bundler, {
            publicPath: shared.webpackConfig.output.publicPath,
            stats: webpackStatsConfig
          }),
          webpackHotMiddleware(bundler, {
            reload: true
          })
        ]
      },
      notify: false,
      open: false,
    });
  });
};
