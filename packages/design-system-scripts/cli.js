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
  .demandCommand()
  .help().argv;
