import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as Icons from '../packages/design-system/src/components/Icons';

const root = path.join(__dirname, '..');
const webComponentsPath = path.join(
  root,
  'packages',
  'design-system',
  'src',
  'components',
  'web-components'
);
const iconsPath = path.join(webComponentsPath, 'ds-icons');

const icons = Object.keys(Icons);

export const convertIcon = async (iconName: string, filePath: string = iconsPath) => {
  await writeFile(`${filePath}/${iconName}.tsx`, 'Hello World');
};

export const convertIcons = async (iconNames: string[] = icons, filePath: string = iconsPath) => {
  Promise.all(iconNames.map((iconName) => convertIcon(iconName, filePath)));
};

convertIcons();
