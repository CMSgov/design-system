#!/usr/bin/env node

const gulp = require('gulp');
const path = require('path');
const yargs = require('yargs');

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
    handler: argv => {
      loadGulpTasks(argv, ['./gulp/stats', './gulp/sass', './gulp/build']);
      runGulpTask('build');
    }
  })
  // An example of the next command. Note the 'shared' part
  // .command({
  //   command: 'start <sourcePackageDir> <docsPackageDirs..>',
  //   desc: 'Hosts the docs site locally with a webpack dev server',
  //   builder: yargs => {
  //     describeSourcePackageDir(yargs);
  //     describeDocsPackageDirs(yargs);
  //   },
  //   handler: argv => {
  //     const shared = require('./gulp/shared')(argv);
  //     loadGulpTasks(shared, [
  //       './gulp/stats',
  //       './gulp/sass',
  //       './gulp/build',
  //       './gulp/docs',
  //       './gulp/webpack'
  //     ]);
  //     runGulpTask('build');
  //   }
  // })
  .help().argv;

function loadGulpTasks(settings, modulesPaths) {
  modulesPaths.forEach(modulePath => require(modulePath)(gulp, settings));
}

function runGulpTask(taskName) {
  gulp.task(taskName)();
}

function describeSourcePackageDir(yargs) {
  yargs.positional('sourcePackageDir', {
    desc: 'The relative path to your main design-system package (that contains a src directory)',
    type: 'string'
  });
}

function describeDocsPackageDirs(yargs) {
  yargs.positional('docsPackageDirs..', {
    desc:
      'The relative paths to one or more docs-package directories. The first directory will be the default set of docs, and every docs directory specified after it will override files in the previous one, where the rightmost directory path takes the most precedence.',
    type: 'string'
  });
}
