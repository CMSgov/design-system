const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const { ProvidePlugin } = require('webpack');

const nodeModules = path.resolve(__dirname, 'node_modules');
const coreDist = path.resolve(__dirname, 'packages', 'design-system', 'dist');
const coreEsm = path.join(coreDist, 'preact-components', 'esm');
const coreWC = path.join(coreEsm, 'web-components');

/**
 *
 * @param bool preact - whether to use preact instead of react
 * @param bool webComponents - whether we're targeting web components
 * @returns
 */
function generateWebpackConfig({ preact = false, webComponents = false }) {
  const plugins = [];
  let entry;
  let externals = {};
  let resolve = {};
  let optimization = {};
  let output = {
    // Expose all the index file's exports as a "DesignSystem" global object
    library: 'DesignSystem',
  };

  if (webComponents) {
    // Not sure if this should be externals or a different chunk.
    // Maybe we need to make two passes with WebPack for web components, where the second
    // one chunks everything by directory in src/components/web-components. Chunking is
    // probably the best option because it can automatically code split and ensure we have
    // every bit of code we need that is shared.
    // https://webpack.js.org/guides/code-splitting
    // Actually, since we don't use dynamic imports and aren't automatically downloading
    // the other chunks via JavaScript, maybe having multiple entries is indeed the most
    // appropriate option.
    // externals = {
    //   [path.resolve('packages', 'design-system', 'src', 'components')]
    // }
    // optimization = {
    //   runtimeChunk: 'single',
    // }
    // optimization = {
    //   splitChunks: {
    //     chunks: 'all',
    //     // name: function(module, chunks, cacheGroupKey) {
    //     //   const moduleFileName = module
    //     //     .identifier()
    //     //     .split('/')
    //     //     .reduceRight((item) => item);
    //     //   console.log(moduleFileName, chunks, cacheGroupKey)
    //     //   console.log('----')
    //     //   const allChunksNames = chunks.map((item) => item.name).join('~');
    //     //   return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
    //     // }
    //   }
    // }
    entry = {
      all: path.resolve(coreWC, 'index.js'),
      base: [
        path.resolve(coreEsm, 'analytics'),
        path.resolve(coreEsm, 'config'),
        path.resolve(coreEsm, 'i18n'),
        path.resolve(coreEsm, 'utilities', 'useId'),
        path.resolve(coreWC, 'preactement', 'define'),
        // path.resolve(coreWC, 'base.js'),
        'preact/jsx-runtime',
        'preact/hooks',
        'preact/compat',
        // These ones are used in enough of them that it warrants pulling them out
        'classnames',
      ],
      ...[
        'ds-alert',
        'ds-badge',
        'ds-button',
        'ds-dropdown',
        'ds-hint',
        'ds-inline-error',
        'ds-label',
        'ds-usa-banner',
      ].reduce((obj, component) => {
        obj[component] = {
          import: path.resolve(coreWC, component, `${component}.js`),
          dependOn: 'base',
          runtime: false,
        };
        return obj;
      }, {}),
      // 'ds-alert': {
      //   import: path.resolve(coreWC, 'ds-alert', 'ds-alert.js'),
      //   dependOn: 'base',
      //   runtime: false,
      // },
      // 'ds-usa-banner': {
      //   import: path.resolve(coreWC, 'ds-usa-banner', 'ds-usa-banner.js'),
      //   dependOn: 'base',
      //   runtime: false,
      // },
    };
  } else {
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
    output.filename = 'react-components.js';
  } else if (!webComponents) {
    output.filename = 'preact-components.js';
  } else {
    // bundleName = 'web-components.js';
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
