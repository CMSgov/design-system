import chalk from 'chalk';
import yargs from 'yargs';
import dotenv from 'dotenv';
import { BASE_URL_CMS } from './requests';
import { printTable } from './output';
import {
  scanDesignSystemVersions,
  scanDependentDependencyVersions,
  searchDependents,
} from './scans';

const designSystemPackageNames = [
  '@cmsgov/design-system',
  '@cmsgov/ds-healthcare-gov',
  '@cmsgov/ds-medicare-gov',
  '@cmsgov/design-system-core',
];

// TODO: Create a command that lists dependent repositories

yargs
  .option('token', {
    alias: 't',
    type: 'string',
    description: 'GitHub Enterprise personal access token',
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Output verbose logging of scans',
  })
  .option('designSystems', {
    type: 'array',
    choices: designSystemPackageNames,
    description: 'The set of design systems to base the search off of. Separate values with spaces',
  })
  .command(
    'versions',
    'Scans versions of the design systems in use',
    () => {},
    async (argv) => {
      const tables = await scanDesignSystemVersions(getCommonOpts(argv));
      tables.forEach(printTable);
    }
  )
  .command(
    'dependency <dependencyName>',
    "Searches dependent projects' code for a specific string",
    (yargs) => {
      return yargs.positional('dependencyName', {
        type: 'string',
        demandOption: true,
      });
    },
    async (argv) => {
      const tables = await scanDependentDependencyVersions({
        ...getCommonOpts(argv),
        dependencyName: argv.dependencyName,
      });
      tables.forEach(printTable);
    }
  )
  .command(
    'search <searchString>',
    "Searches dependent projects' code for a specific string",
    (yargs) => {
      return yargs
        .positional('searchString', {
          type: 'string',
          demandOption: true,
        })
        .option('extensions', {
          type: 'array',
        });
    },
    async (argv) => {
      const tables = await searchDependents({
        ...getCommonOpts(argv),
        searchString: argv.searchString,
        fileExtensions: (argv.extensions as string[] | undefined) ?? [],
      });
      tables.forEach(printTable);
    }
  )
  .demandCommand(1)
  .help().argv;

function getCommonOpts(argv: any) {
  dotenv.config();
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

  const chosenPackageNames =
    (argv.designSystems as string[] | undefined) ?? designSystemPackageNames;

  return {
    accessToken: accessToken as string,
    baseUrl: BASE_URL_CMS,
    dsPackageNames: chosenPackageNames,
    verbose: !!argv.verbose,
  };
}
