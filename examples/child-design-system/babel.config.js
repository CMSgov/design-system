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
          // Jest requires modules, but module is false otherwise to compile ES modules on build
          modules: isTest ? undefined : false,
        },
      ],
    ],
    plugins: [],
  };
};
