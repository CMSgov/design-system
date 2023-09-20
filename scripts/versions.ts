import path from 'node:path';
import themes from '../themes.json';
import { readFileSync, writeFileSync } from 'node:fs';

const root = path.join(__dirname, '..');
const versionsFileName = path.join(root, 'versions.json');

function readJson(filename: string): { [key: string]: any } {
  return JSON.parse(readFileSync(filename, { encoding: 'utf8' }));
}

function writeJson(filename: string, json: { [key: string]: any }) {
  writeFileSync(filename, JSON.stringify(json, null, 2));
}

function getPackageVersion(packageName: string): string {
  const packageFileName = path.join(root, 'packages', packageName, 'package.json');
  const packageData = readJson(packageFileName);
  return packageData.version;
}

// We only care about the first digit in the version string (the major version)
const getMajorVersion = parseInt;
const isBetaVersion = (version: string) => version.includes('beta');

export function updateVersions() {
  const versions = readJson(versionsFileName);

  for (const theme of Object.values(themes)) {
    const currentVersion = getPackageVersion(theme.packageName);

    // Add the new version to the beginning of the list
    versions[theme.packageName].unshift(currentVersion);

    // Cull old beta versions in the list
    const isOldBeta = (version: string) => {
      if (!isBetaVersion(version)) {
        return false;
      }

      const isOld = getMajorVersion(version) < getMajorVersion(currentVersion);
      const isBetaForReleasedVersion =
        getMajorVersion(version) === getMajorVersion(currentVersion) &&
        !isBetaVersion(currentVersion);

      return isOld || isBetaForReleasedVersion;
    };
    versions[theme.packageName] = versions[theme.packageName].filter(
      (version: string) => !isOldBeta(version)
    );
  }

  writeJson(versionsFileName, versions);
}
