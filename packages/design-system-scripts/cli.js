#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');

// The yargs library actually made it so you have to access `.argv` at the end
// or else it won't do anything. Not sure what the reasoning there was.
// eslint-disable-next-line no-unused-expressions
yargs
  .usage('Usage: $0 <command> [options]')
  .describe(
    'skiplatest',
    'Use this option when collecting stats on output files that do not yet exist in the latest release'
  )
  .command({
    command: 'build <sourcePackageDir>',
    desc: 'Builds the JavaScript and Sass for your main design-system package',
    builder: yargs => {
      describeSourcePackageDir(yargs);
    },
    handler: async argv => {
      const { build } = require('./gulp/build');
      await build(argv.sourcePackageDir);
    }
  })
  .help().argv;

function describeSourcePackageDir(yargs) {
  yargs.positional('sourcePackageDir', {
    desc: 'The relative path to your main design-system package (that contains a src directory)',
    type: 'string',
    coerce: dir => path.resolve(dir)
  });
}

// function describeDocsPackageDirs(yargs) {
//   yargs.positional('docsPackageDirs..', {
//     desc:
//       'The relative paths to one or more docs-package directories. The first directory will be the default set of docs, and every docs directory specified after it will override files in the previous one, where the rightmost directory path takes the most precedence.',
//     type: 'string',
//     coerce: dirs => dirs.map(dir => path.resolve(dir))
//   });
// }
