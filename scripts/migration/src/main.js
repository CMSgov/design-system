#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  confirmStart,
  doPatternSearch,
  doFileSearchAndReplace,
  getConfigFileList,
  inquireForFile,
  readConfigFile,
} from './lib/migrate-helpers.mjs';

// some chalk helpers
const g = (x) => chalk.green(x);
const r = (x) => chalk.red(x);
const w = (x) => chalk.whiteBright(x);
const m = (x) => chalk.magenta(x);
const y = (x) => chalk.gray(x);

// get args
const argv = yargs(hideBin(process.argv))
  .scriptName('migration-helper')
  .usage(
    '$0 --file migration-config-file.json --cwd "../root/directory --ignore "**/ignored/**", "**/another_ignored/**"'
  )
  .option('file', {
    type: 'string',
    description: 'Migration configuration file.',
  })
  .option('cwd', {
    type: 'string',
    description: 'Working directory to scan.',
  })
  .option('ignore', {
    type: 'array',
    description: 'Glob patterns to ignore during search.',
  })
  .help().argv;

const CONFIG_FOLDER = './configs';

// script starts here
const main = async () => {
  const configs = await getConfigFileList(CONFIG_FOLDER);

  const configData = !argv.file
    ? await inquireForFile(CONFIG_FOLDER, configs)
    : await readConfigFile(argv.file);

  // take the cwd if they specify on command line
  const cwd = !argv.cwd ? configData.globConfig.cwd : argv.cwd;
  configData.globConfig.cwd = cwd;
  // take ignored list if they specify on command line
  const ignored = !argv.ignore ? configData.globConfig.ignore : argv.ignore;
  configData.globConfig.ignore = ignored;

  const files = await doPatternSearch(configData);

  /*
   * display loaded configuration statistics & number of files that will be analyzed
   */
  console.log(`\n${g('++')} Configuration Loaded! ${g('++')}\n`);
  console.log(`[ ${w(files.length)} ] files queued for operation\n`);
  console.log(`${m('-')} ${w('WORKING DIR')} ${y(':')} ${cwd}`);
  Object.keys(configData).map((key) => {
    if (key !== 'globConfig') {
      console.log(`${m('-')} ${w(key.toUpperCase())} ${y(':')} ${JSON.stringify(configData[key])}`);
    }
  });
  console.log(`${m('-')} ${w('IGNORED')} ${y(':')} ${JSON.stringify(ignored)}\n`);

  if (await confirmStart()) {
    console.log(`${g('++')} Starting ...`);
    doFileSearchAndReplace(files, configData.expressions);
    // check if file has less than 5 newlines
    // check if file is empty
    // if so, skip it
    // increment number of replacements
    // when file closes send back number of replacements in filename
    //
  } else {
    console.log('cancelling');
  }
};

main();
