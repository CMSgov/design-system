import path from 'node:path';
import themes from '../themes.json';
import versions from '../versions.json';
import { readFileSync, writeFileSync } from 'node:fs';

type PackageName = keyof typeof versions;

const root = path.join(__dirname, '..');

export default function appendVersions() {
  for (const theme of Object.values(themes)) {
    const packageFileName = path.join(root, 'packages', theme.packageName, 'package.json');
    const packageData = JSON.parse(readFileSync(packageFileName, { encoding: 'utf8' }));
    const currentVersion = packageData.version as string;
    versions[theme.packageName as PackageName].unshift(currentVersion);
  }

  const versionsFileName = path.join(root, 'versions.json');
  writeFileSync(versionsFileName, JSON.stringify(versions, null, 2));
}
