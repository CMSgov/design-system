/**
 * The `server` task starts a Browsersync server to enable previewing the
 * documentation site locally (localhost:3000). We integrate Browsersync with
 * Webpack's hot reloading capability to enable tons of cool stuff like: form
 * replication, scroll and click mirroring, and injecting updated CSS and JS
 * without a page refresh :mindblown:
 */
const fs = require('fs');
const path = require('path');
const util = require('util');
const webpack = util.promisify(require('webpack'));
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const createWebpackConfig = require('./webpack.config');
const webpackStatsConfig = require('./webpackStats.config');
const { log, logTask, logError } = require('../common/logUtil');

function getConfig(sourcePackageDir, docsPackageDir, rootPath) {
  return createWebpackConfig(
    docsPackageDir,
    [
      fs.realpathSync(path.resolve(sourcePackageDir, 'src')),
      fs.realpathSync(path.resolve(docsPackageDir, 'src'))
    ],
    rootPath,
    ''
  );
}

module.exports = {
  async runWebpackStatically(sourcePackageDir, docsPackageDir, rootPath) {
    logTask('🚜 ', 'Running Webpack statically');
    try {
      const config = getConfig(sourcePackageDir, docsPackageDir, rootPath);
      const stats = await webpack(config);

      log(stats.toString(webpackStatsConfig));
    } catch (err) {
      logError('webpack static', err.stack || err);
      if (err.details) {
        logError('webpack static', err.details);
      }
    }
  },
  async runWebpackServer(sourcePackageDir, docsPackageDir, rootPath, browserSync) {
    logTask('🚜 ', 'Running Webpack server');
    try {
      const config = getConfig(sourcePackageDir, docsPackageDir, rootPath);
      const bundler = await webpack(config);

      browserSync.init({
        port: '3000',
        notify: false,
        startPath: rootPath,
        server: {
          baseDir: docsPackageDir,
          middleware: [
            webpackDevMiddleware(bundler, {
              publicPath: config.output.publicPath,
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
        files: [`./${path.join(docsPackageDir, '/**/*.html')}`],
        snippetOptions: {
          blacklist: ['/example/*']
        }
      });
    } catch (err) {
      logError('webpack server', err.stack || err);
      if (err.details) {
        logError('webpack server', err.details);
      }
    }
  }
};
