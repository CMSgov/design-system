import { BASE_URL_CMS, getApiRequest, getFileRequest } from './requests';
import Table from 'cli-table3';
import chalk from 'chalk';

interface DependentInfo {
  repo: string;
  filePath: string;
  packageName: string;
  version: string;
}

export async function findReactVersions(accessToken: string, packageName: string) {
  // There are two types of requests that we need to set up for GitHub
  const apiRequest = getApiRequest(accessToken, BASE_URL_CMS);
  const requestFile = getFileRequest(accessToken, BASE_URL_CMS);

  // Make request to Github search API
  const searchString = packageName.replace('@cmsgov/', '') + '"';
  const qualifiers = 'filename:package extension:json';
  const q = `${searchString} ${qualifiers}`;
  const searchResponse = await apiRequest('GET /search/code', { q });

  // Pick through the results and keep the valid ones
  const dependents: DependentInfo[] = [];
  for (const item of searchResponse.data.items) {
    const path = item.git_url.replace(BASE_URL_CMS, '');
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

function printTables(packages: string[], packageDependents: DependentInfo[][]) {
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

export async function printReactVersions(accessToken: string, packages: string[]) {
  const packageDependents = await Promise.all(
    packages.map((packageName) => findReactVersions(accessToken, packageName))
  );
  printTables(packages, packageDependents);
}
