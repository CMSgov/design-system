import chalk from 'chalk';
import { RequestOptions, getApiRequest, getFileRequest } from './requests';
import { OutputTable } from './output';

export interface LoggingOptions {
  verbose?: boolean;
}

export interface DependentPackageData {
  repo: string;
  packageFilePath: string;
  packageData: { [key: string]: any };
  dsPackageName: string;
  dsPackageVersion: string;
}

export interface GetDependentPackageDataOptions extends RequestOptions, LoggingOptions {
  dsPackageName: string;
}

export async function getDependentPackageData({
  dsPackageName,
  ...requestOpts
}: GetDependentPackageDataOptions): Promise<DependentPackageData[]> {
  // There are two types of requests that we need to set up for GitHub
  const apiRequest = getApiRequest(requestOpts);
  const requestFile = getFileRequest(requestOpts);

  // Make request to Github search API
  const searchString = dsPackageName.replace('@cmsgov/', '') + '"';
  const qualifiers = 'filename:package extension:json';
  const q = `${searchString} ${qualifiers}`;
  const searchResponse = await apiRequest('GET /search/code', { q });

  // Pick through the results and keep the valid ones
  const dependentsPackageData = [];
  for (const item of searchResponse.data.items) {
    const path = item.git_url.replace(requestOpts.baseUrl, '');
    const fileResponse = await requestFile(`GET ${path}`);
    const packageData = JSON.parse(fileResponse.data);
    const dsPackageVersion =
      packageData.dependencies?.[dsPackageName] ?? packageData.devDependencies?.[dsPackageName];

    // Only if we find the package key in the dependencies is this a valid result. Examples
    // A common false positive is repos that use other design systems with the string
    // "design-system" in the package name. Unfortunately the GitHub code-search API doesn't
    // allow us to search strings the include characters like `@` and `/`
    if (dsPackageVersion) {
      dependentsPackageData.push({
        repo: item.repository.full_name,
        packageFilePath: item.path,
        packageData,
        dsPackageName,
        dsPackageVersion,
      });
    }
  }

  return dependentsPackageData;
}

export interface ScanDesignSystemVersionsOptions extends RequestOptions, LoggingOptions {
  dsPackageNames: string[];
}

export async function scanDesignSystemVersions({
  dsPackageNames,
  ...requestOpts
}: ScanDesignSystemVersionsOptions): Promise<OutputTable[]> {
  const dependentsPackageData = await Promise.all(
    dsPackageNames.map((dsPackageName) =>
      getDependentPackageData({ ...requestOpts, dsPackageName })
    )
  );

  return dsPackageNames.map((dsPackageName, i) => ({
    title: `Versions of '${dsPackageName}' used by dependents`,
    head: ['Repository', 'Version'],
    rows: dependentsPackageData[i].map(({ repo, dsPackageVersion }) => [repo, dsPackageVersion]),
  }));
}

export interface ScanDependentDependencyVersionsOptions extends RequestOptions, LoggingOptions {
  dsPackageNames: string[];
  dependencyName: string;
}

export async function scanDependentDependencyVersions({
  dsPackageNames,
  dependencyName,
  ...requestOpts
}: ScanDependentDependencyVersionsOptions): Promise<OutputTable[]> {
  const dependentsPackageData = await Promise.all(
    dsPackageNames.map((dsPackageName) =>
      getDependentPackageData({ ...requestOpts, dsPackageName })
    )
  );

  return dsPackageNames.map((packageName, i) => ({
    title: `Versions of '${dependencyName}' used by dependents of '${packageName}'`,
    head: ['Repository', `${dependencyName} version`],
    rows: dependentsPackageData[i].map(({ repo, packageData }) => {
      const version =
        packageData.dependencies?.[dependencyName] ?? packageData.devDependencies?.[dependencyName];
      return [repo, version];
    }),
  }));
}

export interface SearchRepositoriesOptions extends RequestOptions, LoggingOptions {
  repositories: string[];
  searchString: string;
  fileExtensions?: string[];
}

export async function searchRepositories({
  repositories,
  searchString,
  fileExtensions,
  verbose,
  ...requestOpts
}: SearchRepositoriesOptions) {
  // There are two types of requests that we need to set up for GitHub
  const apiRequest = getApiRequest(requestOpts);

  // Make request to Github search API
  const repoQualifiers = repositories.map((repo) => `repo:${repo}`).join(' ');
  const extensionQualifiers = fileExtensions?.map((ext) => `extension:${ext}`).join(' ') ?? '';
  const q = `${searchString} ${repoQualifiers} ${extensionQualifiers}`;

  if (verbose) {
    console.log('Performing the following code search:');
    console.log('');
    console.log(chalk.cyan(q));
    console.log('');
    process.stdout.write('Fetching and tabulating results...');
  }

  const repositoryResults: { [repoName: string]: number } = {};
  let page = 1;
  const perPage = 50;
  let itemsProcessed = 0;
  let searchResponse;
  do {
    searchResponse = await apiRequest('GET /search/code', { q, page, per_page: perPage });
    for (const item of searchResponse.data.items) {
      const repo = item.repository.full_name;
      repositoryResults[repo] = (repositoryResults[repo] ?? 0) + 1;
    }
    itemsProcessed += searchResponse.data.items.length;
    page++;
  } while (itemsProcessed < searchResponse.data.total_count);

  if (verbose) {
    process.stdout.write(`finished processing ${itemsProcessed} results.\n`);
  }

  return repositories.map((repo) => [repo, repositoryResults[repo]?.toString() ?? '0']);
}

export interface SearchDependentsOptions extends RequestOptions, LoggingOptions {
  dsPackageNames: string[];
  searchString: string;
  fileExtensions?: string[];
}

export async function searchDependents({
  dsPackageNames,
  searchString,
  fileExtensions,
  verbose,
  ...requestOpts
}: SearchDependentsOptions): Promise<OutputTable[]> {
  if (verbose) {
    console.log('Searching for dependents of the following design system packages:');
    console.log('');
    console.log(chalk.cyan(dsPackageNames.join('\n')));
    console.log('');
  }

  const dependentsPackageData = await Promise.all(
    dsPackageNames.map((dsPackageName) =>
      getDependentPackageData({ ...requestOpts, dsPackageName })
    )
  );
  const searchResultsByDesignSystem = await Promise.all(
    dependentsPackageData.map((dependentsData) => {
      const repositories = dependentsData.map(({ repo }) => repo);
      return searchRepositories({
        ...requestOpts,
        repositories,
        searchString,
        fileExtensions,
        verbose,
      });
    })
  );

  return dsPackageNames.map((packageName, i) => ({
    title: `Results for '${searchString}' found in dependents of '${packageName}'`,
    head: ['Repository', 'Results'],
    rows: searchResultsByDesignSystem[i],
  }));
}
