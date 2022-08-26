module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['jest', 'jsx-a11y', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'eol-last': 'warn',
    indent: 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],
    'no-use-before-define': 'off',
    'no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'no-undef': 'warn',
    'no-useless-escape': 'warn',
    'standard/computed-property-even-spacing': 'off',
    'react/display-name': 'off',
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'warn',
    'react/no-find-dom-node': 'warn',
    'react/no-multi-comp': 'off',
    'react/prefer-es6-class': 'warn',
    'react/prefer-stateless-function': 'warn',
    'react/sort-comp': 'off',
    'react/prop-types': [1, { ignore: ['className', 't'] }],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: ['*.jsx'],
      rules: {
        'jsx-quotes': 'off',
        'react/forbid-prop-types': 'warn',
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-first-prop-new-line': ['error', 'multiline'],
        'react/jsx-handler-names': 'error',
        'react/jsx-key': 'warn',
        'react/jsx-pascal-case': 'error',
        'react/jsx-wrap-multilines': 'error',
        'react/jsx-no-target-blank': 'warn',
      },
    },
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
    {
      files: ['*.stories.jsx'],
      rules: {
        'react/prop-types': 'off',
        'react/no-array-index-key': 'off',
      },
    },
  ],
};
