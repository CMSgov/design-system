import { kebabCaseIt } from 'case-it/kebab';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as Icons from '../Icons';

const componentsPath = path.join(__dirname, '..');
const webComponentsPath = path.join(componentsPath, 'web-components');
const iconsPath = path.join(webComponentsPath, 'ds-icons');

const icons = Object.keys(Icons);

/**
 * Customizes the test template for a specific web component.
 *
 * @param webComponentName The name of the web component being tested.
 * @param template The test template that will be customized.
 * @returns The customized test template.
 */
export const customizeTemplate = (webComponentName: string, template: string) => {
  return template.replace(/WEB_COMPONENT_NAME/g, webComponentName);
};

/**
 * Converts a React icon component into a web component.
 *
 * @param iconName The name of the icon being converted.
 * @param filePath The path of the folder where the web component files should live.
 */
export const convertIcon = async (iconName: string, filePath: string = iconsPath) => {
  const webComponentName = `ds-${kebabCaseIt(iconName)}`;

  const testTemplate = await readFile(`${iconsPath}/templates/test-template.txt`, {
    encoding: 'utf8',
  });
  const webComponentTemplate = await readFile(`${iconsPath}/templates/web-component-template.txt`, {
    encoding: 'utf8',
  });

  await Promise.all([
    // the web component
    writeFile(
      `${filePath}/${webComponentName}.tsx`,
      customizeTemplate(webComponentName, webComponentTemplate)
    ),
    // test file
    writeFile(
      `${filePath}/${webComponentName}.test.tsx`,
      customizeTemplate(webComponentName, testTemplate)
    ),
  ]);
};

/**
 * Calls `convertIcon` on a list of icons.
 *
 * @param iconNames Names list of icons being converted.
 * @param filePath The path of the folder where the new files should live.
 */
export const convertIcons = async (iconNames: string[] = icons, filePath: string = iconsPath) => {
  await Promise.all(iconNames.map((iconName) => convertIcon(iconName, filePath)));
};
