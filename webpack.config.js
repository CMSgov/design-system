const CopyPlugin = require('copy-webpack-plugin');
const { ProvidePlugin } = require('webpack');

/**
 *
 * @param bool preact - whether to use preact instead of react
 * @param bool webComponents - whether we're targeting web components
 * @returns
 */
function generateWebpackConfig({ preact = false, webComponents = false }) {
  const plugins = [];
  let externals = {};
  let resolve = {};
  let bundleName;

  if (!webComponents) {
    // If we're not bundling these as web components, don't include the react
    // or preact runtimes in our bundle because our customers need to interact
    // with the framework directly in order to use our components, and we don't
    // expose it in our code for them to do so. They should instead load the
    // framework modules before loading our bundle.
    externals = preact
      ? {
          preact: 'preact',
        }
      : {
          react: 'React',
          'react-dom': 'ReactDOM',
        };

    plugins.push(
      new CopyPlugin({
        patterns: preact
          ? [
              require.resolve('preact/dist/preact.min.umd.js'),
              require.resolve('preact/dist/preact.umd.js'),
              require.resolve('preact/dist/preact.umd.js.map'),
            ]
          : [
              require.resolve('react/umd/react.production.min.js'),
              require.resolve('react-dom/umd/react-dom.production.min.js'),
            ],
      })
    );
  }

  if (preact) {
    // If we're using preact, we need to replace resolve references to react
    // to their preact equivalents.
    resolve = {
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    };

    // And we also need to provide values for these global Preact functions
    plugins.push(
      new ProvidePlugin({
        h: ['preact', 'h'],
        Fragment: ['preact', 'Fragment'],
      })
    );
  }

  if (!preact) {
    bundleName = 'react-components.js';
  } else if (!webComponents) {
    bundleName = 'preact-components.js';
  } else {
    bundleName = 'web-components.js';
  }

  return {
    output: {
      filename: bundleName,
      // Expose all the index file's exports as a "DesignSystem" global object
      library: 'DesignSystem',
    },
    mode: process.env.NODE_ENV || 'production',
    devtool: 'source-map',
    plugins,
    resolve,
    externals,
  };
}

module.exports = generateWebpackConfig;
