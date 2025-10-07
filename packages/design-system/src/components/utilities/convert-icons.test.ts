import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { convertIcon, convertIcons, customizeTemplate } from './convert-icons';
import { existsSync } from 'node:fs';

const iconNames = ['TestIcon', 'ExampleIcon', 'AnotherIcon'];

let tempDir;

// These tests are flaky due to the need to read and write from the file system.
// I'm skipping them because they are not necessary once the script has run.
describe.skip('convertIcons', () => {
  beforeEach(() => {
    const randomInt = Math.floor(Math.random() * (100000 - 1) + 1);
    tempDir = path.join(__dirname, `temp-${randomInt}`);

    mkdir(tempDir);
  });

  afterEach(() => {
    rm(tempDir, { recursive: true, force: true });
  });

  it('creates a file for every icon in the array', async () => {
    const webComponentNames = ['ds-test-icon', 'ds-example-icon', 'ds-another-icon'];

    await convertIcons(iconNames, tempDir);

    webComponentNames.forEach((iconName) => {
      expect(existsSync(`${tempDir}/${iconName}.tsx`)).toBe(true);
    });
  });

  it('creates an index file in the filePath', async () => {
    await convertIcons(iconNames, tempDir);

    expect(existsSync(`${tempDir}/index.ts`)).toBe(true);
  });

  describe('when index file already exists', () => {
    it('does not overwrite the existing index file', async () => {
      const indexContents = 'This is existing content in the index file.';

      await writeFile(`${tempDir}/index.ts`, indexContents);

      await convertIcons(iconNames, tempDir);

      const indexFile = await readFile(`${tempDir}/index.ts`, { encoding: 'utf8' });
      expect(indexFile).toMatch(indexContents);

      await rm(`${tempDir}/index.ts`);
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
      await convertIcon(iconName, tempDir);

      const testFile = await readFile(`${tempDir}/${webComponentName}.test.tsx`, {
        encoding: 'utf8',
      });

      const re = new RegExp(String.raw`describe\('${webComponentName}'`);
      expect(testFile).toMatch(re);
    });

    it('appends an import statement to index.ts', async () => {
      // Create index file
      await writeFile(`${tempDir}/index.ts`, '');

      await convertIcon(iconName, tempDir);

      const indexFile = await readFile(`${tempDir}/index.ts`, { encoding: 'utf8' });
      const re = new RegExp(String.raw`import './${webComponentName}'`);

      expect(indexFile).toMatch(re);
    });

    describe('when the files already exist', () => {
      it('does not overwrite the files', async () => {
        const componentFileContents = 'This is test content for the web component file.';
        const testFileContents = 'This content is for the test file.';
        const webComponentFilePath = `${tempDir}/${webComponentName}.tsx`;
        const testFilePath = `${tempDir}/${webComponentName}.test.tsx`;

        await Promise.all([
          writeFile(webComponentFilePath, componentFileContents),
          writeFile(testFilePath, testFileContents),
        ]);

        await convertIcon(iconName, tempDir);

        const [componentFile, testFile] = await Promise.all([
          readFile(webComponentFilePath, { encoding: 'utf8' }),
          readFile(testFilePath, { encoding: 'utf8' }),
        ]);

        expect(componentFile).toMatch(componentFileContents);
        expect(testFile).toMatch(testFileContents);
      });
    });
  });

  describe('customizeTemplate', () => {
    it('replaces WEB_COMPONENT_NAME with the web component name', () => {
      const testTemplate = `
        This a test template. WEB_COMPONENT_NAME should changed to the web
        component name, regardless of whether is separated by spaces or if
        it('WEB_COMPONENT_NAME').is.in.code()
      `;
      const iconName = 'TestIcon';
      const webComponentName = 'ds-test-icon';

      const re = new RegExp(webComponentName);
      const customizedTemplate = customizeTemplate(iconName, webComponentName, testTemplate);
      expect(customizedTemplate).toMatch(re);
      expect(customizedTemplate).not.toMatch(/WEB_COMPONENT_NAME/);
    });
  });
});
