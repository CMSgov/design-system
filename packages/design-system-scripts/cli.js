#!/usr/bin/env node
const yargs = require('yargs');
const getPackageJson = require('./gulp/common/getPackageJson');
const { logIntroduction } = require('./gulp/common/logUtil');

async function updateOptions(options) {
  if (!options.githubUrl) {
    const pkg = await getPackageJson(process.cwd());
    if (pkg && pkg.repository) {
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
    desc: 'Builds the design system source and outputs compiled JavaScript and Sass.',
    builder: (yargs) => {
      describeSourceDir(yargs);
      describeStatsOptions(yargs);
    },
    handler: async (argv) => {
      await logIntroduction(argv.sourceDir);
      const { buildSrc } = require('./gulp/build');
      const { printStats } = require('./gulp/stats');
      const options = await updateOptions(argv);

      await buildSrc(options.sourceDir, { ...options });
      await printStats(options.sourceDir, { ...options });
    },
  })
  .command({
    command: 'build-docs <sourceDir> <docsDir>',
    desc: 'Builds the design system source and its corresponding documentation site',
    builder: (yargs) => {
      describeSourceDir(yargs);
      describeDocsDir(yargs);
      describeDocsOptions(yargs);
      describeStatsOptions(yargs);
    },
    handler: async (argv) => {
      await logIntroduction(argv.sourceDir);
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { printStats } = require('./gulp/stats');
      const options = await updateOptions(argv);

      await buildSrc(options.sourceDir, { ...options });
      await buildDocs(options.sourceDir, options.docsDir, { ...options });
      await printStats(options.sourceDir, { ...options });
    },
  })
  .command({
    command: 'start <sourceDir> <docsDir>',
    desc:
      'Builds and hosts the documentation site locally with a webpack dev server. Changes will be automatically rebuilt and reloaded with browsersync when detected in either the source or docs directories',
    builder: (yargs) => {
      describeSourceDir(yargs);
      describeDocsDir(yargs);
      describeDocsOptions(yargs);
    },
    handler: async (argv) => {
      await logIntroduction(argv.sourceDir);
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { watchDocs } = require('./gulp/watch');
      const options = await updateOptions(argv);

      await buildSrc(options.sourceDir, { ...options });
      await buildDocs(options.sourceDir, options.docsDir, { ...options });
      await watchDocs(options.sourceDir, options.docsDir, { ...options });
    },
  })
  .command({
    command: 'test <directory>',
    desc: 'Runs unit tests in a directory.',
    builder: (yargs) => {
      yargs
        .positional('directory', {
          desc: 'The relative path to the directory where test files are located.',
          type: 'string',
          demandOption: true,
        })
        .option('updateSnapshot', {
          desc:
            'Alias: -u. Use this flag to re-record every snapshot that fails during this test run',
          alias: 'u',
          type: 'boolean',
          default: false,
        })
        .option('watch', {
          desc: 'Alias: -w. Watch files for changes and rerun all tests when something changes',
          alias: 'w',
          type: 'boolean',
          default: false,
        })
        .option('core', {
          desc:
            'Internal flag used by the core CMSDS to modify the jest config. Unless you are on the core CMSDS team, you can ignore this.',
          type: 'boolean',
          default: false,
        });
    },
    handler: async (argv) => {
      const { run } = require('jest');
      const unitConfig = require('./jest/unit.config.js');

      run([
        '--config',
        JSON.stringify(unitConfig(argv.directory, argv.core)),
        ...(argv.updateSnapshot ? ['--updateSnapshot'] : []),
        ...(argv.watch ? ['--watch'] : []),
      ]);
    },
  })
  .command({
    command: 'test:e2e <directory>',
    desc: 'Runs e2e tests in a directory.',
    builder: (yargs) => {
      yargs
        .positional('directory', {
          desc: 'The relative path to the directory where test files are located.',
          type: 'string',
          demandOption: true,
        })
        .option('buildPath', {
          desc: 'The path to the directory containing documentation site build files.',
          type: 'string',
          demandOption: true,
        })
        .option('skipBuild', {
          desc: 'Use this flag to skip rebuilding the documentation site before running e2e tests.',
          type: 'boolean',
          default: false,
        })
        .option('headless', {
          desc: 'Runs e2e tests with headless chrome browser testing.',
          type: 'boolean',
          default: true,
        });
    },
    handler: async (argv) => {
      const { run } = require('jest');
      const e2eConfig = require('./jest/e2e.config.js');

      process.env.BUILD_PATH = argv.buildPath;
      process.env.SKIP_BUILD = argv.skipBuild;
      process.env.HEADLESS = argv.headless;

      run(['--config', JSON.stringify(e2eConfig(argv.directory))]);
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
          desc: 'Automatically fix, where possible, violations reported by rules.',
          type: 'boolean',
          default: false,
        })
        .option('ignorePatterns', {
          desc:
            'Glob patterns to be ignored by prettier, eslint, and stylelint. By default "node_modules" and "dist" directories are ignored.',
          type: 'array',
          default: ['**/node_modules/**', '**/dist/**'],
        });
    },
    handler: async (argv) => {
      const { lintDirectories } = require('./gulp/lint');

      await lintDirectories(argv.directories, argv.fix, argv.ignorePatterns);
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
    .option('name', {
      desc: 'Name of the design system. This is used to render documentation content.',
      type: 'string',
      default: 'CMS Design System',
    })
    .option('githubUrl', {
      type: 'string',
      desc:
        'The base path for your GitHub repository URLs. This is used to render links to releases, issues, etc. If not specified, this defaults to the "repository" property of the package.json in your current working directory.',
    })
    .option('rootPath', {
      desc:
        'The path of the docs site relative to the domain root. For example, if your docs site is hosted at www.domain.com/design/ your rootPath would be `design/`',
      type: 'string',
      default: '',
    });
}

function describeStatsOptions(yargs) {
  yargs.option('skipLatest', {
    desc:
      'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.',
    type: 'boolean',
    default: false,
  });
}
