const path = require('path');

module.exports = function createCdnWebpackConfig(dir) {
  const entry = path.resolve(dir, 'dist', 'esnext', 'index.esm.js');

  return {
    entry,
    output: {
      filename: 'bundle.js',
      path: path.resolve(dir, 'dist', 'js'),
    },
    mode: process.env.NODE_ENV || 'production',
  };
};
