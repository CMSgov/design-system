#!/usr/bin/env node

const yargs = require('yargs');
const { logIntroduction } = require('./gulp/common/logUtil');

// The yargs library actually made it so you have to access `.argv` at the end
// or else it won't do anything. Not sure what the reasoning there was.
// eslint-disable-next-line no-unused-expressions
yargs
  .usage('Usage: $0 <command> [options]')
  .command({
    command: '*',
    handler: () => {
      yargs.showHelp();
    }
  })
  .command({
    command: 'build <sourcePackageDir>',
    desc: 'Builds the JavaScript and Sass for your main design-system package',
    builder: yargs => {
      describeSourcePackageDir(yargs);
      describeStatsOptions(yargs);
    },
    handler: async argv => {
      logIntroduction();
      const { buildSrc } = require('./gulp/build');
      const { printStats } = require('./gulp/stats');

      await buildSrc(argv.sourcePackageDir, { ...argv });
      await printStats(argv.sourcePackageDir, { ...argv });
    }
  })
  .command({
    command: 'build-docs <sourcePackageDir> <docsPackageDir>',
    desc: 'Builds your main design-system package and its corresponding documentation site',
    builder: yargs => {
      describeSourcePackageDir(yargs);
      describeDocsPackageDir(yargs);
      describeDocsOptions(yargs);
      describeStatsOptions(yargs);
    },
    handler: async argv => {
      logIntroduction();
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { printStats } = require('./gulp/stats');

      await buildSrc(argv.sourcePackageDir, { ...argv });
      await buildDocs(argv.sourcePackageDir, argv.docsPackageDir, { ...argv });
      await printStats(argv.sourcePackageDir, { ...argv });
    }
  })
  .command({
    command: 'start <sourcePackageDir> <docsPackageDir>',
    desc:
      'Builds and hosts the docs site locally with a webpack dev server, watching for changes in either the design-system source package or the docs package and rebuilding and refreshing appropriately',
    builder: yargs => {
      describeSourcePackageDir(yargs);
      describeDocsPackageDir(yargs);
      describeDocsOptions(yargs);
    },
    handler: async argv => {
      logIntroduction();
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { watchDocs } = require('./gulp/watch');

      await buildSrc(argv.sourcePackageDir, { ...argv });
      await buildDocs(argv.sourcePackageDir, argv.docsPackageDir, { ...argv });
      await watchDocs(argv.sourcePackageDir, argv.docsPackageDir, { ...argv });
    }
  })
  .demandCommand()
  .help().argv;

function describeSourcePackageDir(yargs) {
  yargs.positional('sourcePackageDir', {
    desc: 'The relative path to your main design-system package (that contains a src directory)',
    type: 'string'
  });
}

function describeDocsPackageDir(yargs) {
  yargs.positional('docsPackageDir', {
    desc:
      'The relative paths to your docs-package directory. The built documentation site will be saved to the "dist" directory of this directory.',
    type: 'string'
  });
}

function describeDocsOptions(yargs) {
  yargs
    .option('rootPath', {
      default: '',
      description:
        'The path of the docs site relative to the domain root. For example, if your docs site is hosted at www.domain.com/design/ your rootPath would be `design/`'
    })
    .option('githubUrl', {
      default: '',
      description:
        'The base path for your GitHub repository URLs. This is used to render links to releases, issues, etc.'
    });
}

function describeStatsOptions(yargs) {
  yargs.option('skipLatest', {
    default: false,
    description:
      'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.'
  });
}
