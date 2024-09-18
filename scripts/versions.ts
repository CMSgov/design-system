import path from 'node:path';
import themes from '../themes.json';
import { readFileSync, writeFileSync } from 'node:fs';

export const root = path.join(__dirname, '..');
const versionsFileName = path.join(root, 'versions.json');

export function readJson(filename: string): { [key: string]: any } {
  return JSON.parse(readFileSync(filename, { encoding: 'utf8' }));
}

export function writeJson(filename: string, json: { [key: string]: any }) {
  const stringifiedJson = JSON.stringify(json, null, 2);
  writeFileSync(filename, stringifiedJson);
}

export function getPackageVersion(packageName: string): string {
  const packageFileName = path.join(root, 'packages', packageName, 'package.json');
  const packageData = readJson(packageFileName);
  return packageData.version;
}

export function getPackageVersions(): Record<string, string> {
  const currentVersionsByPackage: Record<string, string> = {};

  for (const theme of Object.values(themes)) {
    const currentVersion = getPackageVersion(theme.packageName);
    currentVersionsByPackage[theme.packageName] = currentVersion;
  }

  return currentVersionsByPackage;
}

// We only care about the first digit in the version string (the major version)
const getMajorVersion = parseInt;
const isBetaVersion = (version: string) => version.includes('beta');
const getBetaVersion = (version: string) => version.split('-beta.')[1];

export function updateVersions() {
  const versions = readJson(versionsFileName);
  const currentVersionsByPackage = getPackageVersions();
  for (const packageName in currentVersionsByPackage) {
    const currentVersion = currentVersionsByPackage[packageName];
    // Add the new version to the beginning of the list
    versions[packageName].unshift(currentVersion);

    // Cull old beta versions in the list
    const isOldBeta = (version: string) => {
      if (!isBetaVersion(version)) {
        return false;
      }

      const isOld = getMajorVersion(version) < getMajorVersion(currentVersion);
      const isBetaForReleasedVersion =
        getMajorVersion(version) === getMajorVersion(currentVersion) &&
        !isBetaVersion(currentVersion);
      const isPreviousBetaVersion = getBetaVersion(version) < getBetaVersion(currentVersion);

      return isOld || isBetaForReleasedVersion || isPreviousBetaVersion;
    };
    versions[packageName] = versions[packageName].filter((version: string) => !isOldBeta(version));
  }

  writeJson(versionsFileName, versions);

  return currentVersionsByPackage;
}
