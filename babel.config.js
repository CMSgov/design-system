module.exports = function (api) {
  api.cache(true);

  const presets = [
    '@babel/preset-react',
    '@babel/typescript',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3',
        // CMSDS scripts will add this property when compiling for ESM, otherwise will compile in CommonJS
        // modules: false
      },
    ],
  ];

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-object-assign',
    'inline-react-svg',
    [
      'transform-inline-environment-variables',
      {
        include: ['CMSDS_FLAGS'],
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
