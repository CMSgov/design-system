#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { default as conf } from './lib/migrate-helpers.mjs';

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
  const configs = await conf.getConfigFiles(CONFIG_FOLDER);

  const configData = !argv.file
    ? await conf.inquireForFile(CONFIG_FOLDER, configs)
    : await conf.readConfigFile(argv.file);

  const files = await conf.doPatternSearch(configData);

  // display loaded configuration
  console.log(`\n${chalk.green('++')} Configuration Loaded! ${chalk.green('++')}\n`);
  console.log(`${chalk.whiteBright(files.length)} files qeued for operation`);
  Object.keys(configData).map((key) => {
    console.log(`${chalk.magenta('-')} ${key.toUpperCase()} ${chalk.grey(':')} ${configData[key]}`);
  });

  // await conf.inquireConfirmOrEdit()
};

main();
