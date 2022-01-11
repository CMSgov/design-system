module.exports = {
  extends: '@cmsgov/eslint-config-design-system',
  parser: 'babel-eslint',
  rules: {
    'react/jsx-handler-names': 0,
  },
  overrides: [
    {
      files: ['*.stories.jsx'],
      rules: {
        'react/prop-types': 'off',
        'react/no-multi-comp': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
      rules: {
        // Disabling based off official documentation on
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
      },
    },
  ],
};
