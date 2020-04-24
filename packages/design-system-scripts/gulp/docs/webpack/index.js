/**
 * The `server` task starts a Browsersync server to enable previewing the
 * documentation site locally (localhost:3000). We integrate Browsersync with
 * Webpack's hot reloading capability to enable tons of cool stuff like: form
 * replication, scroll and click mirroring, and injecting updated CSS and JS
 * without a page refresh :mindblown:
 */
const path = require('path');
const util = require('util');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const createWebpackConfig = require('./createWebpackConfig');
const webpackStatsConfig = require('./webpackStats.config');
const { log, logTask, logError } = require('../../common/logUtil');

module.exports = {
  async runWebpackStatically(sourceDir, docsDir, options) {
    logTask('🚜 ', 'Running Webpack statically');
    try {
      const config = await createWebpackConfig(sourceDir, docsDir, options);
      const stats = await util.promisify(webpack)(config); // Promisify webpack so the task will wait on the compilation to finish

      // TODO: Replace stats module logging with clean logTask count
      // const filesProcessed = stats.toJson(webpackStatsConfig).modules.length;
      // logTask(`📜  ${filesProcessed}`, `JS files processed in ${docsDir}`);

      // Log out any errors or warnings
      log(stats.toString(webpackStatsConfig));
    } catch (err) {
      logError('webpack static', err.stack || err);
      if (err.details) {
        logError('webpack static', err.details);
      }
    }
  },
  async runWebpackServer(sourceDir, docsDir, options, browserSync) {
    logTask('🚜 ', 'Running Webpack server');
    try {
      const config = await createWebpackConfig(sourceDir, docsDir, options);
      const bundler = webpack(config);

      browserSync.init({
        port: '3000',
        notify: false,
        startPath: options.rootPath,
        server: {
          baseDir: path.resolve(docsDir, 'dist'),
          middleware: [
            webpackDevMiddleware(bundler, {
              publicPath: config.output.publicPath,
              stats: webpackStatsConfig,
              watchOptions: {
                ignored: /node_modules/,
              },
            }),
            webpackHotMiddleware(bundler, {
              reload: true,
            }),
          ],
        },
        files: [`./${path.join(docsDir, '/**/*.html')}`],
        snippetOptions: {
          blacklist: ['/example/*'],
        },
      });
    } catch (err) {
      logError('webpack server', err.stack || err);
      if (err.details) {
        logError('webpack server', err.details);
      }
    }
  },
};
