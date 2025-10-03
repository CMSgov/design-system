import { mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { convertIcon, convertIcons, customizeTestTemplate } from './convert-icons';
import { existsSync } from 'node:fs';

const tempDir = path.join(__dirname, 'temp');

describe('convertIcons', () => {
  beforeAll(() => {
    mkdir(tempDir);
  });

  afterAll(() => {
    rm(tempDir, { recursive: true, force: true });
  });

  it('creates a file for every icon in the array', async () => {
    const iconNames = ['TestIcon', 'ExampleIcon', 'AnotherIcon'];
    const webComponentNames = ['ds-test-icon', 'ds-example-icon', 'ds-another-icon'];

    await convertIcons(iconNames, tempDir);

    webComponentNames.forEach((iconName) => {
      expect(existsSync(`${tempDir}/${iconName}.tsx`)).toBe(true);
    });
  });

  describe('convertIcon', () => {
    const iconName = 'TestIcon';
    const webComponentName = 'ds-test-icon';

    it('creates a new file in the given path', async () => {
      await convertIcon(iconName, tempDir);

      expect(existsSync(`${tempDir}/${webComponentName}.tsx`)).toBe(true);
    });

    it('creates a test file next to the component file', async () => {
      const testFileName = 'ds-test-icon.test.tsx';

      await convertIcon(iconName, tempDir);

      const testFile = await readFile(`${tempDir}/${testFileName}`, { encoding: 'utf8' });

      const re = new RegExp(String.raw`describe\('${webComponentName}'`);
      expect(testFile).toMatch(re);
    });
  });

  describe('customizeTestTemplate', () => {
    it('replaces WEB_COMPONENT_NAME with the web component name', () => {
      const testTemplate = `
        This a test template. WEB_COMPONENT_NAME should changed to the web
        component name, regardless of whether is separated by spaces or if
        it('WEB_COMPONENT_NAME').is.in.code()
      `;
      const webComponentName = 'ds-test-icon';

      const re = new RegExp(webComponentName);
      const customizedTemplate = customizeTestTemplate(webComponentName, testTemplate);
      expect(customizedTemplate).toMatch(re);
      expect(customizedTemplate).not.toMatch(/WEB_COMPONENT_NAME/);
    });
  });
});
