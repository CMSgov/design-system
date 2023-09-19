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

export function appendVersions() {
  const versions = readJson(versionsFileName);

  for (const theme of Object.values(themes)) {
    const currentVersion = getPackageVersion(theme.packageName);
    versions[theme.packageName].unshift(currentVersion);
  }

  writeJson(versionsFileName, versions);
}

export function cullBetaVersions() {
  const versions = readJson(versionsFileName);

  for (const theme of Object.values(themes)) {
    const currentVersion = getPackageVersion(theme.packageName);

    const isOldBeta = (version: string) =>
      version.includes('beta') &&
      // We only care about the first digit in the version string (the major version)
      parseInt(version) < parseInt(currentVersion);

    versions[theme.packageName] = versions[theme.packageName].filter(
      (version: string) => !isOldBeta(version)
    );
  }

  writeJson(versionsFileName, versions);
}
