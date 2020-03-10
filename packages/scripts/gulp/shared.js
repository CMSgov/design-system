const fs = require('fs');

module.exports = argv => {
  // The path of the docs site relative to the domain root (ie. design.cms.gov/v1/index.html)
  const rootPath = argv.root || '';

  // These properties are shared with every Gulp task
  return {
    ...argv,
    rootPath,
    browserSync: require('browser-sync').create(),
    webpackConfig: require('../../docs/webpack.config')(argv.docsPath, rootPath, [
      fs.realpathSync(path.resolve(argv.sourcePackageDir, 'src'))
    ])
  };
};
