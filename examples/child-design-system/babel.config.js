module.exports = (api) => {
  const isTest = api.env('test');

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: '3.0.0',
          // Conditionally set `modules` depending on the environment because Jest requires `modules` to not be false
          // Otherwise, `modules` is set to `false` in order to compile ES modules
          // ES modules are highly recommended because they are required for certain webpack tree shaking optimizations
          modules: isTest ? undefined : false,
        },
      ],
    ],
    plugins: [
      // Install and add any plugins for your project here
      // i.e. "@babel/plugin-proposal-class-properties",
    ],
  };
};
