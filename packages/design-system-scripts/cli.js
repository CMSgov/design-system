#!/usr/bin/env node

const yargs = require('yargs');
const getPackageJson = require('./gulp/common/getPackageJson');
const { logIntroduction } = require('./gulp/common/logUtil');

async function initCommand(options) {
  await logIntroduction(options.sourcePackageDir);

  const pkg = await getPackageJson(process.cwd());
  if (pkg) {
    if (!options.githubUrl && pkg.repository) {
      // Use package.json `repository` as default `githubUrl`
      options.githubUrl = pkg.repository;
    }
  }

  return options;
}

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
      const options = await initCommand(argv);
      const { buildSrc } = require('./gulp/build');
      const { printStats } = require('./gulp/stats');

      await buildSrc(options.sourcePackageDir, { ...options });
      await printStats(options.sourcePackageDir, { ...options });
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
      const options = await initCommand(argv);
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { printStats } = require('./gulp/stats');

      await buildSrc(options.sourcePackageDir, { ...options });
      await buildDocs(options.sourcePackageDir, options.docsPackageDir, { ...options });
      await printStats(options.sourcePackageDir, { ...options });
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
      const options = await initCommand(argv);
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { watchDocs } = require('./gulp/watch');

      await buildSrc(options.sourcePackageDir, { ...options });
      await buildDocs(options.sourcePackageDir, options.docsPackageDir, { ...options });
      await watchDocs(options.sourcePackageDir, options.docsPackageDir, { ...options });
    }
  })
  .command({
    command: 'lint <directories..>',
    desc: 'Runs stylelint and eslint on the "src" of one or more directories.',
    builder: yargs => {
      yargs.positional('directories..', {
        desc:
          'The relative paths to one or more directories. Linting will be run on the "src" folder inside the provided directories.',
        type: 'string',
        demandOption: true
      })
      .option('fix', {
        default: false,
        description:
          'Automatically fix, where possible, violations reported by rules.'
      })
    },
    handler: async argv => {
      const { lintDirectories } = require('./gulp/lint');

      await lintDirectories(argv.directories, argv.fix);
    }
  })
  .demandCommand()
  .help().argv;

function describeSourcePackageDir(yargs) {
  yargs.positional('sourcePackageDir', {
    desc: 'The relative path to your main design-system package (that contains a src directory)',
    type: 'string',
    demandOption: true
  });
}

function describeDocsPackageDir(yargs) {
  yargs.positional('docsPackageDir', {
    desc:
      'The relative paths to your docs-package directory. The built documentation site will be saved to the "dist" directory of this directory.',
    type: 'string',
    demandOption: true
  });
}

function describeDocsOptions(yargs) {
  yargs
    .option('rootPath', {
      default: '',
      description:
        'The path of the docs site relative to the domain root. For example, if your docs site is hosted at www.domain.com/design/ your rootPath would be `design/`'
    })
    .option('name', {
      default: 'CMS Design System',
      description: 'Name of the design system. This is used to render documentation content.'
    })
    .option('githubUrl', {
      default: '',
      description:
        'The base path for your GitHub repository URLs. This is used to render links to releases, issues, etc. If not specified, this defaults to the "repository" property of the package.json in your current working directory.'
    });
}

function describeStatsOptions(yargs) {
  yargs.option('skipLatest', {
    default: false,
    description:
      'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.'
  });
}
