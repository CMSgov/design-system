import path from 'node:path';
import themes from '../themes.json';
import versions from '../versions.json';
import { readFileSync, writeFileSync } from 'node:fs';

type PackageName = keyof typeof versions;

for (const theme of Object.values(themes)) {
  const packageFileName = path.join('packages', theme.packageName, 'package.json');
  const packageData = JSON.parse(readFileSync(packageFileName, { encoding: 'utf8' }));
  const currentVersion = packageData.version as string;
  versions[theme.packageName as PackageName].unshift(currentVersion);
}

writeFileSync('../versions.json', JSON.stringify(versions, null, 2));
