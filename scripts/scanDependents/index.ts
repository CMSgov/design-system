import chalk from 'chalk';
import yargs from 'yargs';
import dotenv from 'dotenv';
import { printTable } from './output';
import { scanDesignSystemVersions, scanDependentDependencyVersions } from './scans';

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
  .option('dependency', {
    type: 'string',
    description:
      'Scan for a particular named package that is a dependency of our dependencies. Example value: "react"',
  })
  .help().argv;

dotenv.config();

async function main() {
  const accessToken = argv.token ?? process.env.GHE_ACCESS_TOKEN;
  if (!accessToken) {
    console.error(
      chalk.red(
        'A GitHub Enterprise personal access token is required. Please provide this as an argument or set a GHE_ACCESS_TOKEN environment variable using an .env file or by exporting that variable within your current shell.'
      )
    );
    yargs.showHelp();
    process.exit(1);
  }

  try {
    let tables;
    const dependency = yargs.argv.dependency as string | undefined;
    if (dependency) {
      tables = await scanDependentDependencyVersions(
        accessToken,
        designSystemPackageNames,
        dependency
      );
    } else {
      tables = await scanDesignSystemVersions(accessToken, designSystemPackageNames);
    }
    tables.forEach(printTable);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
