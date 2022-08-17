#!/usr/bin/env node
const yargs = require('yargs');
const { logIntroduction } = require('./gulp/common/logUtil');
const path = require('path');

const defaultConfigPath = 'cmsds.config.js';

function getConfig() {
  // TODO, clean up script parameters to use the CMSDS config better
  const configFile = require(path.resolve(process.cwd(), yargs.argv.config || defaultConfigPath));
  const configDefaults = require('./configDefaults');
  const config = { ...configDefaults, ...configFile };
  return config;
}
const config = getConfig();

// The yargs library actually made it so you have to access `.argv` at the end
// or else it won't do anything. Not sure what the reasoning there was.
yargs
  .usage('Usage: $0 <command> [options]')
  .option('config', {
    desc: 'The relative path to the CMSDS config file',
    type: 'boolean',
    default: defaultConfigPath,
  })
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
        desc: 'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.',
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
          desc: 'Alias: -u. Use this flag to re-record every snapshot that fails during this test run',
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
        .option('collectCoverage', {
          desc: 'outputs test coverage data',
          type: 'boolean',
          default: true,
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
        ...(argv.collectCoverage ? ['--collectCoverage'] : []),
      ]);
    },
  })
  .command({
    command: 'test:a11y <directory>',
    desc: 'Runs a11y tests in a directory.',
    builder: (yargs) => {
      yargs
        .positional('directory', {
          desc: 'The relative path to the directory where test files are located.',
          type: 'string',
          demandOption: true,
        })
        .option('headless', {
          desc: 'Runs a11y tests with headless chrome browser testing.',
          type: 'boolean',
          default: true,
        });
    },
    handler: async (argv) => {
      const { run } = require('jest');
      const a11yConfig = require('./jest/a11y.config.js');

      process.env.NODE_ENV = 'test';
      process.env.BUILD_PATH = argv.buildPath;
      process.env.SKIP_BUILD = argv.skipBuild;
      process.env.HEADLESS = argv.headless;

      run(['--config', JSON.stringify(a11yConfig(argv.directory))]);
    },
  })
  .demandCommand()
  .help().argv;
