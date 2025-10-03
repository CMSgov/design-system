import { kebabCaseIt } from 'case-it/kebab';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as Icons from '../Icons';

const componentsPath = path.join(__dirname, '..');
const webComponentsPath = path.join(componentsPath, 'web-components');
const iconsPath = path.join(webComponentsPath, 'ds-icons');

const icons = Object.keys(Icons);

export const convertIcon = async (iconName: string, filePath: string = iconsPath) => {
  const webComponentName = kebabCaseIt(iconName);
  await writeFile(`${filePath}/ds-${webComponentName}.tsx`, 'Hello World');
};

export const convertIcons = async (iconNames: string[] = icons, filePath: string = iconsPath) => {
  await Promise.all(iconNames.map((iconName) => convertIcon(iconName, filePath)));
};
