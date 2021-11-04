module.exports = function(api) {
  api.cache(true);

  const presets = [
    "@babel/preset-react",
    "@babel/typescript",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: "3.6",
        // CMSDS scripts will add this property when compiling for ESM, otherwise will compile in CommonJS
        // modules: false
      },
    ],
  ];
  const plugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    ['babel-plugin-typescript-to-proptypes', { comments: true }],
  ];

  return {
    presets,
    plugins,
  };
};
