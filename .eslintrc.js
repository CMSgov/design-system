module.exports = {
  extends: ['@cmsgov/eslint-config-design-system', 'plugin:storybook/recommended'],
  rules: {
    // Avoid exploits. If you need dangerouslySetInnerHTML, then temporarily
    // disable this rule in the script rather than removing it from here.
    'react/no-danger': 'error',
  },
  overrides: [
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
    {
      files: ['*.stories.jsx'],
      rules: {
        'react/prop-types': 'off',
        'react/no-multi-comp': 'off',
      },
    },
  ],
};
