import { BASE_URL_CMS, getApiRequest, getFileRequest } from './requests';
import { OutputTable } from './output';

export interface DependentPackageData {
  repo: string;
  packageFilePath: string;
  packageData: { [key: string]: any };
  dsPackageName: string;
  dsPackageVersion: string;
}

export async function getDependentPackageData(
  accessToken: string,
  dsPackageName: string
): Promise<DependentPackageData[]> {
  // There are two types of requests that we need to set up for GitHub
  const apiRequest = getApiRequest(accessToken, BASE_URL_CMS);
  const requestFile = getFileRequest(accessToken, BASE_URL_CMS);

  // Make request to Github search API
  const searchString = dsPackageName.replace('@cmsgov/', '') + '"';
  const qualifiers = 'filename:package extension:json';
  const q = `${searchString} ${qualifiers}`;
  const searchResponse = await apiRequest('GET /search/code', { q });

  // Pick through the results and keep the valid ones
  const dependentsPackageData = [];
  for (const item of searchResponse.data.items) {
    const path = item.git_url.replace(BASE_URL_CMS, '');
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

export async function scanDesignSystemVersions(
  accessToken: string,
  packageNames: string[]
): Promise<OutputTable[]> {
  const dependentsPackageData = await Promise.all(
    packageNames.map((packageName) => getDependentPackageData(accessToken, packageName))
  );

  return packageNames.map((packageName, i) => ({
    title: `Versions of '${packageName}' used by dependents`,
    head: ['Repository', 'Version'],
    rows: dependentsPackageData[i].map(({ repo, dsPackageVersion }) => [repo, dsPackageVersion]),
  }));
}

export async function scanDependentDependencyVersions(
  accessToken: string,
  packageNames: string[],
  dependencyName: string
): Promise<OutputTable[]> {
  const dependentsPackageData = await Promise.all(
    packageNames.map((packageName) => getDependentPackageData(accessToken, packageName))
  );

  return packageNames.map((packageName, i) => ({
    title: `Versions of '${dependencyName}' used by dependents of '${packageName}'`,
    head: ['Repository', `${dependencyName} version`],
    rows: dependentsPackageData[i].map(({ repo, packageData }) => {
      const version =
        packageData.dependencies?.[dependencyName] ?? packageData.devDependencies?.[dependencyName];
      return [repo, version];
    }),
  }));
}
