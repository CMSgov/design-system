import { DependentInfo, findPackageVersions } from './findPackageVersions';
import Table from 'cli-table3';
import chalk from 'chalk';

export async function findDesignSystemVersions(accessToken: string, packages: string[]) {
  return await Promise.all(
    packages.map((packageName) => findPackageVersions(accessToken, packageName))
  );
}

function printTables(packages: string[], packageDependents: DependentInfo[][]) {
  for (let i = 0; i < packages.length; i++) {
    const packageName = packages[i];
    const deps = packageDependents[i];
    const table = new Table({ head: ['Repository', 'Version'] });
    deps.forEach(({ repo, version }) => table.push([repo, version]));
    console.log('');
    console.log(chalk.cyan(packageName));
    console.log(table.toString());
  }
}

export async function printDesignSystemVersions(accessToken: string, packages: string[]) {
  let packageDependents: DependentInfo[][];

  try {
    packageDependents = await findDesignSystemVersions(accessToken, packages);
  } catch (error) {
    console.log(error);
    return;
  }

  printTables(packages, packageDependents);
}
