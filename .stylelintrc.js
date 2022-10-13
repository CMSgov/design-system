module.exports = {
  customSyntax: 'postcss-scss',
  defaultSeverity: 'error',
  extends: 'stylelint-config-recommended',
  ignoreFiles: [
    '**/dist/**',
    '**/helpers/**',
    '**/__tests__/**',
    'tmp/**',
    '**/types/**',
    '**/styles/utilities/**',
    '**/docs/public/**',
    '**/docs/static/**',
  ],
  plugins: ['stylelint-scss'],
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: {
    'declaration-no-important': [
      true,
      {
        severity: 'warning',
      },
    ],
    'function-parentheses-space-inside': 'always',
    'rule-empty-line-before': 'always-multi-line',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/selector-no-redundant-nesting-selector': true,
  },
};
