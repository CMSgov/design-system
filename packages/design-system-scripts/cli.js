#!/usr/bin/env node
const yargs = require('yargs');
const getPackageJson = require('./gulp/common/getPackageJson');
const { logIntroduction } = require('./gulp/common/logUtil');

async function initCommand(options) {
  await logIntroduction(options.sourceDir);

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
    },
  })
  .command({
    command: 'build <sourceDir>',
    desc: 'Builds the JavaScript and Sass for your main design-system package',
    builder: (yargs) => {
      describeSourceDir(yargs);
      describeStatsOptions(yargs);
    },
    handler: async (argv) => {
      const options = await initCommand(argv);
      const { buildSrc } = require('./gulp/build');
      const { printStats } = require('./gulp/stats');

      await buildSrc(options.sourceDir, { ...options });
      await printStats(options.sourceDir, { ...options });
    },
  })
  .command({
    command: 'build-docs <sourceDir> <docsDir>',
    desc: 'Builds your main design-system package and its corresponding documentation site',
    builder: (yargs) => {
      describeSourceDir(yargs);
      describeDocsDir(yargs);
      describeDocsOptions(yargs);
      describeStatsOptions(yargs);
    },
    handler: async (argv) => {
      const options = await initCommand(argv);
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { printStats } = require('./gulp/stats');

      await buildSrc(options.sourceDir, { ...options });
      await buildDocs(options.sourceDir, options.docsDir, { ...options });
      await printStats(options.sourceDir, { ...options });
    },
  })
  .command({
    command: 'start <sourceDir> <docsDir>',
    desc:
      'Builds and hosts the docs site locally with a webpack dev server, watching for changes in either the design-system source package or the docs package and rebuilding and refreshing appropriately',
    builder: (yargs) => {
      describeSourceDir(yargs);
      describeDocsDir(yargs);
      describeDocsOptions(yargs);
    },
    handler: async (argv) => {
      const options = await initCommand(argv);
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { watchDocs } = require('./gulp/watch');

      await buildSrc(options.sourceDir, { ...options });
      await buildDocs(options.sourceDir, options.docsDir, { ...options });
      await watchDocs(options.sourceDir, options.docsDir, { ...options });
    },
  })
  .command({
    command: 'test <directory>',
    desc: 'Runs tests in one or more directory.',
    builder: (yargs) => {
      yargs
        .positional('directory', {
          desc: 'The relative path to the directory where test files are located.',
          type: 'string',
          demandOption: true,
        })
        .option('e2e', {
          default: false,
          description: 'Use this flag to run e2e tests instead of unit tests',
        })
        .option('updateSnapshot', {
          alias: 'u',
          default: false,
          description:
            'Alias: -u. Use this flag to re-record every snapshot that fails during this test run',
        })
        .option('watch', {
          alias: 'w',
          default: false,
          description:
            'Alias: -w. Watch files for changes and rerun all tests when something changes',
        })
        .option('ci', {
          default: false,
          description:
            "Use this flag when running in a CI environment. This changes Jest's behavior to fail a test when a new snapshot is encountered",
        });
    },
    handler: async (argv) => {
      const { run } = require('jest');
      const unitConfig = require('./jest/unit.config.js');
      const e2eConfig = require('./jest/e2e.config.js');
      const jestConfig = argv.e2e ? e2eConfig(argv.directory) : unitConfig(argv.directory);

      run([
        '--config',
        JSON.stringify(jestConfig),
        ...(argv.updateSnapshot ? ['--updateSnapshot'] : []),
        ...(argv.watch ? ['--watch'] : []),
      ]);
    },
  })
  .command({
    command: 'lint <directories..>',
    desc: 'Runs prettier, stylelint and eslint on one or more directories.',
    builder: (yargs) => {
      yargs
        .positional('directories..', {
          desc:
            'The relative paths to one or more directories. Linting will be run on the "src" folder inside the provided directories.',
          type: 'string',
          demandOption: true,
        })
        .option('fix', {
          default: false,
          description: 'Automatically fix, where possible, violations reported by rules.',
        })
        .option('ignorePatterns', {
          type: 'array',
          description:
            'Glob patterns to be ignored by prettier, eslint, and stylelint. By default "node_modules" and "dist" directories are ignored.',
        });
    },
    handler: async (argv) => {
      const { lintDirectories } = require('./gulp/lint');
      const ignorePatterns = ['**/node_modules/**', '**/dist/**'].concat(argv.ignorePatterns || []);

      await lintDirectories(argv.directories, argv.fix, ignorePatterns);
    },
  })
  .demandCommand()
  .help().argv;

function describeSourceDir(yargs) {
  yargs.positional('sourceDir', {
    desc: 'The relative path to your main design-system package (that contains a src directory)',
    type: 'string',
    demandOption: true,
  });
}

function describeDocsDir(yargs) {
  yargs.positional('docsDir', {
    desc:
      'The relative paths to your docs-package directory. The built documentation site will be saved to the "dist" directory of this directory.',
    type: 'string',
    demandOption: true,
  });
}

function describeDocsOptions(yargs) {
  yargs
    .option('rootPath', {
      default: '',
      description:
        'The path of the docs site relative to the domain root. For example, if your docs site is hosted at www.domain.com/design/ your rootPath would be `design/`',
    })
    .option('name', {
      default: 'CMS Design System',
      description: 'Name of the design system. This is used to render documentation content.',
    })
    .option('githubUrl', {
      default: '',
      description:
        'The base path for your GitHub repository URLs. This is used to render links to releases, issues, etc. If not specified, this defaults to the "repository" property of the package.json in your current working directory.',
    });
}

function describeStatsOptions(yargs) {
  yargs.option('skipLatest', {
    default: false,
    description:
      'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.',
  });
}
