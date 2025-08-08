module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['jsx-a11y', 'react', 'react-hooks'],
  rules: {
    'no-undef': 'warn',
    'no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'no-useless-escape': 'warn',
    'react/prop-types': [1, { ignore: ['className', 't'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
