export default {
  description:
    'Updates button classes for latest button architecture as of 08/03/2022.\n  - Replaces ds-c-button--primary/success with ds-c-button--solid\n  - Replaces ds-c-button--transparent with ds-c-button--link\n  - Replaces ds-c-button--inverse with ds-c-button--on-dark\n  - Flags ds-c-button and ds-c-button--hover/active/focus as deprecated',
  patterns: ['**/*.{html,htm}'],
  expressions: [
    {
      from: new RegExp(
        /(<\s*?button[\s\S]*?class=[\"\'][\s\S]*?)(ds-c-button--primary|ds-c-button--success)([\s\S]*?[\"\'][\s\S]*?\/?>+)/,
        'gi'
      ),
      to: '$1ds-c-button--solid$3',
    },
    {
      from: new RegExp(
        /(<\s*?button[\s\S]*?class=[\"\'][\s\S]*?)(ds-c-button--transparent)([\s\S]*?[\"\'][\s\S]*?\/?>+)/,
        'gi'
      ),
      to: '$1ds-c-button--link$3',
    },
    {
      from: new RegExp(
        /(<\s*?button[\s\S]*?class=[\"\'][\s\S]*?)(ds-c-button--inverse)([\s\S]*?[\"\'][\s\S]*?\/?>+)/,
        'gi'
      ),
      to: '$1ds-c-button--on-dark$3',
    },
    {
      from: new RegExp(
        /(<\s*?button[\s\S]*?class=[\"\'][\s\S]*?)(ds-c-button|ds-c-button--hover|ds-c-button--active|ds-c-button--focus)([\s\S]*?[\"\'][\s\S]*?\/?>+)/,
        'gi'
      ),
      to: '$& <!-- CMSDS-MIGRATE: ds-c-button and ds-c-button--active/focus/hover will be deprecated in upcoming DS releases -->',
    },
  ],
};
