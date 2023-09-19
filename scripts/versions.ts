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

export function appendVersions() {
  const versions = readJson(versionsFileName);

  for (const theme of Object.values(themes)) {
    const packageFileName = path.join(root, 'packages', theme.packageName, 'package.json');
    const packageData = readJson(packageFileName);
    const currentVersion = packageData.version;
    versions[theme.packageName].unshift(currentVersion);
  }

  writeJson(versionsFileName, versions);
}

export function cullBetaVersions() {
  const versions = readJson(versionsFileName);

  for (const packageName of Object.keys(versions)) {
    versions[packageName] = versions[packageName].filter(
      (version: string) => !version.includes('beta')
    );
  }

  writeJson(versionsFileName, versions);
}
