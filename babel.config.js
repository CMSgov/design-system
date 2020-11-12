module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3',
        // CMSDS scripts will add this property when compiling for ESM, otherwise will compile in CommonJS
        // modules: false
      },
    ],
    '@babel/preset-react',
  ];

  const plugins = ['@babel/plugin-transform-object-assign', 'inline-react-svg'];

  return {
    presets,
    plugins,
  };
};
