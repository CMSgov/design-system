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
  ],
};
