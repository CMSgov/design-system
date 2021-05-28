#!/usr/bin/env node
const yargs = require('yargs');
const { logIntroduction } = require('./gulp/common/logUtil');
const path = require('path');
// TODO, clean up script parameters to use the CMSDS config better
const configFile = require(path.resolve(process.cwd(), 'cmsds.config.js'));
const configDefaults = require('./configDefaults');
const config = { ...configDefaults, ...configFile };

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
    command: 'build',
    desc: 'Builds the design system source and outputs compiled JavaScript and Sass.',
    builder: (yargs) => {
      yargs.option('skipLatest', {
        desc:
          'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.',
        type: 'boolean',
        default: false,
      });
    },
    handler: async (argv) => {
      const { buildSrc } = require('./gulp/build');

      process.env.NODE_ENV = 'production';
      await logIntroduction(config.sourceDir);
      await buildSrc(config.sourceDir, { ...config, ...argv });
    },
  })
  .command({
    command: 'build-docs',
    desc: 'Builds the design system source and its corresponding documentation site',
    builder: (yargs) => {
      yargs
        .option('skipLatest', {
          desc:
            'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.',
          type: 'boolean',
          default: false,
        })
        .option('skipBuild', {
          desc:
            'Use this flag to skip rebuilding the design system package before building the doc site. You must have already ran `cmsds build` or `cmsds build-docs` prior to using this option.',
          type: 'boolean',
          default: false,
        });
      yargs.option('ignoreRootPath', {
        desc:
          'This flag will prevent build files from using `rootPath` while still building for production.',
        type: 'boolean',
        default: false,
      });
      yargs.option('rootPath', {
        desc: 'The URL root path for the published docs site.',
        type: 'string',
        default: config.rootPath,
      });
    },
    handler: async (argv) => {
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');

      process.env.NODE_ENV = 'production';

      // Allow cli args to override or ignore default rootPath defined in cmsds.config.js
      const options = { ...config, ...argv };
      if (argv.ignoreRootPath) {
        options.rootPath = '';
      }

      await logIntroduction(config.sourceDir);
      if (!argv.skipBuild) {
        await buildSrc(config.sourceDir, options);
      }
      await buildDocs(config.sourceDir, config.docsDir, options);
    },
  })
  .command({
    command: 'start',
    desc:
      'Builds and hosts the documentation site locally with a webpack dev server. Changes will be automatically rebuilt and reloaded with browsersync when detected in either the source or docs directories',
    builder: (yargs) => {
      yargs.option('skipLatest', {
        desc:
          'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.',
        type: 'boolean',
        default: false,
      });
    },
    handler: async (argv) => {
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { watchDocs } = require('./gulp/watch');

      process.env.NODE_ENV = 'development';
      // rootPath is not used in local development
      config.rootPath = '';
      await logIntroduction(config.sourceDir);
      await buildSrc(config.sourceDir, { ...config, ...argv });
      await buildDocs(config.sourceDir, config.docsDir, { ...config, ...argv });
      await watchDocs(config.sourceDir, config.docsDir, { ...config, ...argv });
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
        .option('filePath', {
          desc: 'The relative path to a single test file or directory to run',
          type: 'string',
          demandOption: false,
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
        });
    },
    handler: async (argv) => {
      const { run } = require('jest');
      const unitConfig = require('./jest/unit.config.js');

      process.env.NODE_ENV = 'test';
      run([
        '--config',
        JSON.stringify(unitConfig(argv.directory, config.core)),
        ...(argv.updateSnapshot ? ['--updateSnapshot'] : []),
        ...(argv.watch ? ['--watch'] : []),
        ...(argv.filePath ? [argv.filePath] : []),
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
        .option('skipBuild', {
          desc: 'Use this flag to skip rebuilding the documentation site before running e2e tests.',
          type: 'boolean',
          default: false,
        })
        .option('headless', {
          desc: 'Runs e2e tests with headless chrome browser testing.',
          type: 'boolean',
          default: true,
        })
        .option('buildPath', {
          desc: 'The path to the directory containing documentation site build files.',
          type: 'string',
          default: path.join(config.docsDir, 'dist'),
          demandOption: true,
        });
    },
    handler: async (argv) => {
      const { run } = require('jest');
      const e2eConfig = require('./jest/e2e.config.js');

      process.env.NODE_ENV = 'test';
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
          desc: 'The relative path to one or more directories that will be linted.',
          type: 'string',
          demandOption: true,
        })
        .option('fix', {
          desc:
            'Alias: -f. Automatically fix, where possible, violations reported by eslint and stylelint. Prettier autoformats regardless of this flag.',
          alias: 'f',
          type: 'boolean',
          default: false,
        })
        .option('ignorePatterns', {
          desc:
            'Glob patterns to be ignored by prettier, eslint, and stylelint. By default "node_modules" and "dist" directories are ignored.',
          type: 'array',
          default: ['**/node_modules/**', '**/dist/**'],
        })
        .option('failAfterError', {
          desc: 'Process will exit with an error code (1) on linter error.',
          type: 'boolean',
          default: false,
        })
        .option('disableStylelint', {
          desc: 'Flag to opt out of running stylelint on files.',
          type: 'boolean',
          default: false,
        })
        .option('disableEslint', {
          desc: 'Flag to opt out of running eslint on files.',
          type: 'boolean',
          default: false,
        })
        .option('disablePrettier', {
          desc: 'Flag to opt out of running prettier on files.',
          type: 'boolean',
          default: false,
        });
    },
    handler: async (argv) => {
      const { lintDirectories } = require('./gulp/lint');
      const { directories, fix, ignorePatterns, failAfterError, ...disable } = argv;

      process.env.NODE_ENV = 'test';
      await lintDirectories(directories, fix, ignorePatterns, failAfterError, disable);
    },
  })
  .demandCommand()
  .help().argv;
