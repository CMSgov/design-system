module.exports = {
  extends: ['@cmsgov/eslint-config-design-system', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  rules: {
    // Avoid exploits. If you need dangerouslySetInnerHTML, then temporarily
    // disable this rule in the script rather than removing it from here.
    'react/no-danger': 'error',
  },
};
