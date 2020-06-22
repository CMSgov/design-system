module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3.0.0',
        // CMSDS scripts will add this property when compiling for ESM
        // modules: false
      },
    ],
    '@babel/preset-react',
  ];

  const plugins = ['@babel/plugin-transform-object-assign'];

  return {
    presets,
    plugins,
  };
};
