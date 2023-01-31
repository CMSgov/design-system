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
      },
    ],
  ];

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-object-assign',
    ['babel-plugin-typescript-to-proptypes', { comments: true }],
    'inline-react-svg',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment',
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
