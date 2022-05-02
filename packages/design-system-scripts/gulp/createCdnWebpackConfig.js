const path = require('path');

module.exports = function createCdnWebpackConfig(dir) {
  const entry = path.resolve(dir, 'dist', 'esnext', 'index.esm.js');

  return {
    entry,
    output: {
      filename: 'bundle.js',
      path: path.resolve(dir, 'dist', 'js'),
      // Expose all the index file's exports as a "DesignSystem" global object
      library: 'DesignSystem',
    },
    mode: process.env.NODE_ENV || 'production',
    // Don't bundle react, since we don't expose it anyway and you need to interact
    // with those libraries directly in order to use our components.
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  };
};
