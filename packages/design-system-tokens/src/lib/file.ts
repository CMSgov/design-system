import fs from 'fs';
import path from 'path';
import { FileDescriptor } from './types';

/**
 * Flattens an object into a single dimension by reducing into initialObject recursively
 *
 * @param obj - The object to be flattened
 * @param initialObject - The initial object to append to
 * @returns The initial object and subobjects as an object with no subobjects
 */
export const flattenTokens = (
  obj: Record<string, any>,
  initialObject: Record<string, any> = {}
): Record<string, any> => {
  Object.entries(obj).reduce((accumulator, [key, val]) => {
    if (typeof val === 'object') {
      flattenTokens(val, accumulator);
    } else {
      initialObject[key] = val;
    }
    return accumulator;
  }, initialObject);

  return initialObject;
};

/**
 * Given a root path string and an empty string array, returns a
 * string array containing all files under the given path via
 * recursive search.
 *
 * @param rootPath - The root path to scan for files under
 * @param arrayOfFiles - The initial array of files, defaults to empty
 * @returns An array of files path strings found recursively under the rootPath
 */
export const getAllFiles = (rootPath: string, arrayOfFiles: string[] = []): string[] => {
  const files = fs.readdirSync(rootPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file): void {
    if (fs.statSync(`${rootPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${rootPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(rootPath, file));
    }
  });
  return arrayOfFiles;
};

/**
 * Search out all available modules under a path and return an
 * array of objects which contains file descriptors for each file
 *
 * @param rootPath - The root path to collect file data from recursively
 * @returns An array of FileDescriptor objects for files found in the rootPath
 */
export const getFileDescriptors = (rootPath: string): FileDescriptor[] => {
  const allFiles = getAllFiles(rootPath);
  const fileData: FileDescriptor[] = [];

  allFiles.forEach((mod) => {
    // only operating on javascript/typescript files
    const isScript = mod.toLowerCase().match(/\..[ts|js]$/g);

    if (isScript) {
      // moduleImportName strips the modules extension for importing later
      const moduleImportName = mod.replace(/\..+$/, '');
      const parentDirectoryName = path.dirname(mod).split(path.sep).pop();
      const baseName = path.parse(mod).name;

      // ignore index files
      if (baseName === 'index') return;

      fileData.push({
        moduleImportName: moduleImportName,
        parentDirectoryName: parentDirectoryName || '',
        baseName: baseName,
      });
    }
  });

  return fileData;
};

/**
 * Writes a file to filename with content synchronously.
 *
 * @param filename - The output filename string
 * @param content - The content to be written to file
 *
 * @returns An exit code for success or error
 */
export const writeFile = (filename: string, fileData: string): number => {
  try {
    fs.writeFileSync(filename, fileData);
    // eslint-disable-next-line no-console
    console.log(`:: wrote ${filename}`);
    return 0;
  } catch (err) {
    console.error(`There was an issue writing to ${filename}: ${err}`);
    return process.exit(1);
  }
};
