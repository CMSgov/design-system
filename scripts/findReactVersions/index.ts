// This is copied and pasted from `findDesignSystemVersions/index.ts` with a few modifications
// so that it searches for the React versions of our dependents

import { request } from '@octokit/request';
import Table from 'cli-table3';
import chalk from 'chalk';
import yargs from 'yargs';
import dotenv from 'dotenv';

const designSystemPackageNames = [
  '@cmsgov/design-system',
  '@cmsgov/ds-healthcare-gov',
  '@cmsgov/ds-medicare-gov',
];

const argv = yargs
  .option('token', {
    alias: 't',
    type: 'string',
    description: 'GitHub Enterprise personal access token',
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

interface Dependent {
  repo: string;
  filePath: string;
  packageName: string;
  version: string;
}

async function findPackageVersions(packageName: string) {
  // There are two types of requests that we need to set up for GitHub
  const baseUrl = 'https://github.cms.gov/api/v3';
  const authorization = 'token ' + accessToken;
  const apiRequest = request.defaults({
    baseUrl,
    headers: {
      authorization,
      accept: 'application/vnd.github.v3.text-match+json',
    },
  });
  const requestFile = request.defaults({
    baseUrl,
    headers: {
      authorization,
      accept: 'application/vnd.github.v3.raw',
    },
  });

  // Make request to Github search API
  const searchString = packageName.replace('@cmsgov/', '') + '"';
  const qualifiers = 'filename:package extension:json';
  const q = `${searchString} ${qualifiers}`;
  const searchResponse = await apiRequest('GET /search/code', { q });

  // Pick through the results and keep the valid ones
  const dependents: Dependent[] = [];
  for (const item of searchResponse.data.items) {
    const path = item.git_url.replace(baseUrl, '');
    const fileResponse = await requestFile(`GET ${path}`);
    const packageData = JSON.parse(fileResponse.data);
    const dsVersion =
      packageData.dependencies?.[packageName] ?? packageData.devDependencies?.[packageName];

    // Only if we find the package key in the dependencies is this a valid result. Examples
    // A common false positive is repos that use other design systems with the string
    // "design-system" in the package name. Unfortunately the GitHub code-search API doesn't
    // allow us to search strings the include characters like `@` and `/`
    if (dsVersion) {
      const reactVersion = packageData.dependencies?.react ?? packageData.devDependencies?.react;

      dependents.push({
        repo: item.repository.full_name,
        filePath: item.path,
        packageName,
        version: reactVersion,
      });
    }
  }

  return dependents;
}

async function findDesignSystemVersions(packages: string[]) {
  return Promise.all(packages.map(findPackageVersions));
}

// function printCsv(dependents: Dependent[]) {} print all data to one CSV table

function printTables(packages: string[], packageDependents: Dependent[][]) {
  for (let i = 0; i < packages.length; i++) {
    const packageName = packages[i];
    const deps = packageDependents[i];
    const table = new Table({ head: ['Repository', 'React Version'] });
    deps.forEach(({ repo, version }) => table.push([repo, version]));
    console.log('');
    console.log(chalk.cyan(packageName));
    console.log(table.toString());
  }
}

async function main() {
  const packages = designSystemPackageNames;
  let packageDependents: Dependent[][];

  try {
    packageDependents = await findDesignSystemVersions(packages);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  printTables(packages, packageDependents);
}

main();
