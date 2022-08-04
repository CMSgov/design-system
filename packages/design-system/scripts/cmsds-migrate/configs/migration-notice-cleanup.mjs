export default {
  description: 'Cleans up comments/flags made by the cmsds-migrate script.',
  patterns: ['**/*'],
  globbyConfig: {
    ignore: ['**/cmsds-migrate/configs/*.{mjs,js}'],
  },
  expressions: [
    { from: new RegExp(/<!-- CMSDS-MIGRATE:[\s\S]*?-->/, 'gi'), to: '' },
    { from: new RegExp(/\{\/\* CMSDS-MIGRATE:[\s\S]*?\*\/\}/, 'gi'), to: '' },
  ],
};
