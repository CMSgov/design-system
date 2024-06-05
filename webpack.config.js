const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const { ProvidePlugin } = require('webpack');
const { readdirSync } = require('fs');

const nodeModules = path.resolve(__dirname, 'node_modules');
const coreDist = path.resolve(__dirname, 'packages', 'design-system', 'dist');
const coreEsm = path.join(coreDist, 'preact-components', 'esm');

/**
 * Creates and returns a configuration for webpack-stream to be used in a gulp pipeline.
 *
 * @param bool options.entryPath - string or array of file paths for the entry file
 * @param bool options.preact - whether to use preact instead of react
 * @param bool options.webComponents - whether we're targeting web components
 *
 * @returns a configuration object for webpack-stream
 */
function generateWebpackConfig(options) {
  const plugins = [];
  let entry;
  let externals = {};
  let resolve = {};
  let optimization = {};
  let output = {
    // Expose all the index file's exports as a "DesignSystem" global object
    library: 'DesignSystem',
  };

  if (options.webComponents) {
    // We have two options for web-component bundles: everything or a-la-carte. This
    // multi-entry setup doesn't lend itself well to using the gulp pipelines, so
    // we're just ignoring that and creating our own entry config here.
    entry = {
      all: options.entryPath,
      // TODO: To maintain backwards compatibility, duplicate the `all` bundle with its
      // old name, but we can remove this in the next breaking change.
      'web-components': options.entryPath,
      base: [
        // Not going to bother supporting config and i18n side-effects (importing local
        // config and i18n override files) in child design systems until we know we need
        // to. I think it would probably be better to consolidate the packages with the
        // complexity that web component compilation and distribution brings.
        path.resolve(coreEsm, 'analytics'),
        path.resolve(coreEsm, 'config'),
        path.resolve(coreEsm, 'i18n'),
        path.resolve(coreEsm, 'utilities', 'useId'),
        path.resolve(coreEsm, 'web-components', 'preactement', 'define'),
        'preact/jsx-runtime',
        'preact/hooks',
        'preact/compat',
        // These ones are used in enough of them that it warrants pulling them out
        'classnames',
      ],
      ...readdirSync(path.join(coreEsm, 'web-components'), {
        withFileTypes: true,
      })
        .filter((dirent) => dirent.isDirectory())
        .filter((dir) => dir.name.startsWith('ds-'))
        .map((dir) => dir.name)
        .reduce((obj, component) => {
          obj[component] = {
            import: path.resolve(coreEsm, 'web-components', component, 'index.js'),
            dependOn: 'base',
            runtime: false,
          };
          return obj;
        }, {}),
    };
  } else {
    // If we're not bundling these as web components, don't include the react
    // or preact runtimes in our bundle because our customers need to interact
    // with the framework directly in order to use our components, and we don't
    // expose it in our code for them to do so. They should instead load the
    // framework modules before loading our bundle.
    externals = options.preact
      ? {
          preact: 'preact',
        }
      : {
          react: 'React',
          'react-dom': 'ReactDOM',
        };

    plugins.push(
      new CopyPlugin({
        patterns: options.preact
          ? [
              `${nodeModules}/preact/dist/preact.min.umd.js`,
              `${nodeModules}/preact/dist/preact.umd.js`,
              `${nodeModules}/preact/dist/preact.umd.js.map`,
            ]
          : [
              `${nodeModules}/react/umd/react.production.min.js`,
              `${nodeModules}/react-dom/umd/react-dom.production.min.js`,
            ],
      })
    );
  }

  if (options.preact) {
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

  if (!options.preact) {
    output.filename = 'react-components.js';
  } else if (!options.webComponents) {
    output.filename = 'preact-components.js';
  }

  return {
    entry,
    output,
    mode: process.env.NODE_ENV || 'production',
    devtool: 'source-map',
    plugins,
    resolve,
    externals,
    optimization,
  };
}

module.exports = generateWebpackConfig;
