import Table from 'cli-table3';
import chalk from 'chalk';
import yargs from 'yargs';
import dotenv from 'dotenv';
import { printDesignSystemVersions } from './findDesignSystemVersions';
import { printReactVersions } from './findReactVersions';

const designSystemPackageNames = [
  '@cmsgov/design-system',
  '@cmsgov/ds-healthcare-gov',
  '@cmsgov/ds-medicare-gov',
  '@cmsgov/design-system-core',
];

const argv = yargs
  .option('token', {
    alias: 't',
    type: 'string',
    description: 'GitHub Enterprise personal access token',
  })
  .option('react', {
    desc: 'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.',
    type: 'boolean',
    default: false,
  })
  .help().argv;

dotenv.config();

const accessToken = argv.token ?? process.env.GHE_ACCESS_TOKEN;
if (!accessToken) {
  console.error(
    chalk.red(
      'A GitHub Enterprise personal access token is required. Please provide this as an argument or assign it to GHE_ACCESS_TOKEN in a .env file.'
    )
  );
  yargs.showHelp();
  process.exit(1);
}

async function main() {
  try {
    if (yargs.argv.react) {
      await printReactVersions(accessToken, designSystemPackageNames);
    } else {
      await printDesignSystemVersions(accessToken, designSystemPackageNames);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
