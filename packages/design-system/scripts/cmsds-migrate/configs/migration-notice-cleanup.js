export default {
  description: 'Cleans up comments/flags made by the cmsds-migrate script.',
  patterns: ['**/*'],
  globbyConfig: {
    ignore: ['**/*.json'],
  },
  expressions: [
    { from: new RegExp(/<!-- CMSDS-MIGRATE:[\s\S]*?-->/, 'gi'), to: '' },
    { from: new RegExp(/\{\/\* CMSDS-MIGRATE:[\s\S]*?\*\/\}/, 'gi'), to: '' },
  ],
};
