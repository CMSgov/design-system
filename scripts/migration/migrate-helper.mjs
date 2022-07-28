#!/usr/bin/env node

import fs from 'fs';
import inquirer from 'inquirer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .scriptName('migration-helper')
  .usage('$0 --file migration-config-file.json')
  .option('file', {
    type: 'string',
    description: 'Migration configuration file',
  })
  .help().argv;

(async () => {

  const CONFIG_FOLDER = './configs'

  const configOptions = fs.readdirSync(CONFIG_FOLDER)
  let config = argv.file ?? ''

  if (!argv.file) {
    await inquirer.prompt([
      {
        type: 'list',
        name: 'file',
        choices: configOptions,
        pageSize: 4,
        prefix: `\nChoose a migration configuration to run from ${CONFIG_FOLDER}\n`,
      }])
    .then((choice) => {
      const configPath = `${CONFIG_FOLDER}/${choice['file']}`
      config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    })
  }

})()

// find all javascript, ts, jsx, tsx files
// return list of files which contain more than 5 newlines
// grep reduced list for 
//
// find . -path "*/.*" -prune -o -name node_modules -prune -o -type f \( -iname \*.jsx -o -iname \*.tsx -o -iname \*.ts -o -iname \*.js \) -print
// // import chalk from 'chalk';
// import glob from 'glob';

