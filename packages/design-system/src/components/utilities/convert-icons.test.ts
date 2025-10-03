import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { convertIcon, convertIcons } from './convert-icons';
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
    it('creates a new file in the given path', async () => {
      const iconName = 'testFile';
      const webComponentName = 'ds-test-file';

      await convertIcon(iconName, tempDir);

      expect(existsSync(`${tempDir}/${webComponentName}.tsx`)).toBe(true);
    });
  });
});
