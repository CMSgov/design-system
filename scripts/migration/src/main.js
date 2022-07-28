#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { default as h } from './lib/migrate-helpers.mjs';

const argv = yargs(hideBin(process.argv))
  .scriptName('migration-helper')
  .usage('$0 --file migration-config-file.json')
  .option('file', {
    type: 'string',
    description: 'Migration configuration file',
  })
  .help().argv;

const CONFIG_FOLDER = './configs';

const main = async () => {
  const configs = await h.getConfigFiles(CONFIG_FOLDER);
  const configData = !argv.file
    ? await h.inquireForFile(CONFIG_FOLDER, configs)
    : await h.readConfigFile(argv.file);

  console.log(configData);
};

main();
