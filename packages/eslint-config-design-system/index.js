module.exports = {
  extends: ['nava', 'plugin:jsx-a11y/recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    ecmaVersion: 8,
    sourceType: 'module'
  },
  plugins: ['filenames', 'jest', 'jsx-a11y', 'react'],
  rules: {
    'eol-last': 'warn',
    'filenames/match-exported': [2, ['camel', 'pascal']],
    indent: 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        },
        allowChildren: true
      }
    ],
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'jsx-quotes': 'off',
    'sort-imports': 'error',
    'react/forbid-prop-types': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    // handleChange = class method, onChange = prop
    'react/jsx-handler-names': 'error',
    'react/jsx-key': 'warn',
    'react/jsx-pascal-case': 'error',
    'react/jsx-wrap-multilines': 'error',
    'react/no-array-index-key': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-multi-comp': 'error',
    'react/prefer-es6-class': 'error',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': ['error', { ignore: ['className', 't'] }],
    'react/sort-comp': 'error',
    'standard/computed-property-even-spacing': 'off'
  }
};
