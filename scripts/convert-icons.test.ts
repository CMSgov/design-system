import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { convertIcon, convertIcons } from './convert-icons';
import { existsSync } from 'node:fs';

const tempDir = path.join(__dirname, 'temp');

describe('convertIcon', () => {
  beforeEach(() => {
    mkdir(tempDir);
  });

  afterEach(() => {
    rm(tempDir, { recursive: true, force: true });
  });

  it('creates a new file in the given path', async () => {
    const iconName = 'testFile';

    await convertIcon(iconName, tempDir);

    expect(existsSync(`${tempDir}/${iconName}.tsx`)).toBe(true);
  });
});

describe('covertIcons', () => {
  beforeEach(() => {
    mkdir(tempDir);
  });

  afterEach(() => {
    rm(tempDir, { recursive: true, force: true });
  });

  it('creates a file for every icon in the array', async () => {
    const iconNames = ['TestIcon', 'ExampleIcon', 'AnotherIcon'];

    await convertIcons(iconNames, tempDir);

    iconNames.forEach((iconName) => {
      expect(existsSync(`${tempDir}/${iconName}.tsx`)).toBe(true);
    });
  });
});
