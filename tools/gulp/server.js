/**
 * The `server` task starts a Browsersync server to enable previewing the
 * documentation site locally (localhost:3000). We integrate Browsersync with
 * Webpack's hot reloading capability to enable tons of cool stuff like: form
 * replication, scroll and click mirroring, and injecting updated CSS and JS
 * without a page refresh :mindblown:
 */

const argv = require('yargs').argv;
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackStatsConfig = require('../webpack-stats');

module.exports = (gulp, shared) => {
  gulp.task('server', () => {
    const bundler = webpack(shared.webpackConfig);

    shared.browserSync.init({
      files: ['./docs/**/*.html'],
      server: {
        baseDir: 'docs',
        middleware: [
          webpackDevMiddleware(bundler, {
            publicPath: shared.webpackConfig.output.publicPath,
            stats: webpackStatsConfig,
            watchOptions: {
              ignored: /node_modules/
            }
          }),
          webpackHotMiddleware(bundler, {
            reload: true
          })
        ]
      },
      notify: false,
      open: !argv.noopen,
      startPath: shared.rootPath
    });
  });
};
