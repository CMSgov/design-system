#!/usr/bin/env node

import chalk from 'chalk';
import {
  confirmStart,
  doPatternSearch,
  error,
  getConfigFileList,
  getAllFileContents,
  inquireForFile,
  modifyFileContents,
  readConfigFile,
} from './lib/migrate-helpers.mjs';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

(async () => {
  // get command line args
  const argv = yargs(hideBin(process.argv))
    .scriptName('cmsds-migrate')
    .usage(
      '$0 --file migration-config-file.json --cwd "../root/directory --ignore "**/ignored/**", "**/another_ignored/**"'
    )
    .options({
      config: {
        type: 'string',
        description: 'Migration configuration file.',
      },
      cwd: {
        type: 'string',
        description: 'Root directory for scan. Defaults to CWD.',
        default: process.cwd(),
      },
      ignore: {
        type: 'array',
        description: 'Other glob patterns to ignore during search. .gitignore included by default.',
      },
      force: {
        boolean: true,
        description: 'Skip interactive prompts, use caution!',
        default: false,
      },
    })
    .help().argv;

  // get list of configuration files
  const CONFIG_FOLDER = './configs';
  const configList = await getConfigFileList(CONFIG_FOLDER).catch((err) =>
    error('getConfigFileList: ' + err)
  );

  // load configuration from arg or list
  const [configData, configFile] = !argv.config
    ? await inquireForFile(CONFIG_FOLDER, configList).catch((err) =>
        error('inquireForFile: ' + err)
      )
    : await readConfigFile(argv.config).catch((err) => error('readConfigFile: ' + err));

  console.log(
    `\n${chalk.green('++')} Configuration Loaded! (${configFile}) ${chalk.green('++')}\n`
  );

  // take CWD if specified from command line
  const cwd = !argv.cwd ? process.cwd() : argv.cwd;
  configData.globbyConfig.cwd = cwd;
  // push ignore list to configuration array
  if (argv.ignore) {
    configData.globbyConfig.ignore.push(...argv.ignore);
  }

  // run glob search with configData.patterns
  const files = await doPatternSearch(configData);
  if (files.length <= 0) {
    error('No files found! Check your patterns and cwd settings.');
  }

  /*
   * display loaded configuration statistics & number of files that will be analyzed
   * @TODO: could add an option to expand this with the ability to preview file list
   */
  console.log(`[ ${chalk.whiteBright(files.length)} ] files queued for operation\n`);
  console.log(
    `${chalk.magenta('-')} ${chalk.whiteBright('WORKING DIR')} ${chalk.gray(':')} ${cwd}`
  );
  Object.keys(configData).map((key) => {
    if (key !== 'globbyConfig') {
      console.log(
        `${chalk.magenta('-')} ${chalk.whiteBright(key.toUpperCase())} ${chalk.gray(
          ':'
        )} ${JSON.stringify(configData[key])}`
      );
    }
  });
  console.log(
    `${chalk.magenta('-')} ${chalk.whiteBright('IGNORED')} ${chalk.gray(':')} ${JSON.stringify(
      configData.globbyConfig.ignore
    )}\n`
  );

  // kick off file search and replace
  const startModification = () => {
    console.log(`\n${chalk.blue('__')} Starting ...\n`);

    getAllFileContents(files)
      .then((content) => {
        modifyFileContents(content, configData.expressions).then(() =>
          console.log(`\n${chalk.magenta('==')} Modification complete!`)
        );
      })
      .catch((err) => error('getAllFileContents: ' + err));
  };

  // begin file modification based on configuration rules
  // start automatically if --force is specified
  if (!argv.force) {
    confirmStart()
      .then((val) => {
        if (val) {
          startModification();
        } else {
          console.log(`\n${chalk.red('__')} Cancelling ...\n`);
        }
      })
      .catch((err) => error('confirmStart ' + err));
  } else {
    startModification();
  }
})();
