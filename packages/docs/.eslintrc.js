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
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-var-requires': 'off',
        'react/prop-types': 'warn',
      },
    },
  ],
  plugins: ['jsx-a11y', 'react', 'react-hooks'],
  rules: {
    'no-undef': 'warn',
    'no-useless-escape': 'warn',
    'react/prop-types': [1, { ignore: ['className', 't'] }],
  },
};
