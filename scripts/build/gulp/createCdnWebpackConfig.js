const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = function createCdnWebpackConfig(dir) {
  const entry = path.resolve(dir, 'dist', 'esnext', 'index.esm.js');
  const outputDir = path.resolve(dir, 'dist', 'js');

  return {
    entry,
    output: {
      filename: 'bundle.js',
      path: outputDir,
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
    // Since we don't bundle react, go grab it from node_modules
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join('node_modules', 'react', 'umd', 'react.production.min.js'),
            to: outputDir,
          },
          {
            from: path.join('node_modules', 'react-dom', 'umd', 'react-dom.production.min.js'),
            to: outputDir,
          },
        ],
      }),
    ],
  };
};
