module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3.0.0',
        // CMSDS scripts will add this property when compiling for ESM, otherwise will compile in CommonJS
        // modules: false
      },
    ],
  ],
  plugins: [
    // Install and add any plugins for your project here
    // i.e. "@babel/plugin-proposal-class-properties",
  ],
};
