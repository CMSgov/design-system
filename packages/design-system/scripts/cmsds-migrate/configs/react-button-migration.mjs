export default {
  description:
    "Updates react <Button> variations for latest button architecture as of 08/03/2022.\n  - Replaces variation='primary' with 'solid'\n  - Replaces variation='transparent' with 'link'\n  - Replaces variation='danger/success' with 'solid'\n  - Flags visual differences and deprecations for transparent/danger/success variations",
  patterns: ['**/*.{jsx,tsx}'],
  expressions: [
    {
      from: new RegExp(/(<\s*?button[\s\S]*?variation=["'])(primary)(["'][\s\S]*?\/?>+)/, 'gi'),
      to: '$1solid$3',
    },
    {
      from: new RegExp(
        /(<\s*?button[\s\S]*?variation=["'])(transparent)(["'][\s\S]*?\/?>+)/,
        'gi'
      ),
      to: "$1ghost$3 {/* CMSDS-MIGRATE: possible visual difference between 'transparent' and 'ghost' */}",
    },
    {
      from: new RegExp(
        /(<\s*?button[\s\S]*?variation=["'])(danger|success)(["'][\s\S]*?\/?>+)/,
        'gi'
      ),
      to: '$1solid$3 {/* CMSDS-MIGRATE: $2 variation will be deprecated */}',
    },
  ],
};
