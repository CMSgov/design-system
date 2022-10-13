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
    'rule-empty-line-before': 'always-multi-line',
    'selector-pseudo-class-case': 'lower',
    'no-empty-first-line': true,
    linebreaks: 'unix',
    'function-max-empty-lines': 0,
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/selector-no-redundant-nesting-selector': true,
  },
};
