import * as fs from 'fs';
import * as path from 'path';
import * as Types from './types';

// converts an rgb string 'rgb(15,24,128)' to a hex value '#0819A9'
//
export const RgbToHex = (r: number, g: number, b: number): Types.HexValue => {
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `#${hex}`;
};

// converts a hex string '#F3G1AA' to an rgb value string 'rgb(142, 24, 89)'
//
export const HexToRgb = (hex: Types.HexValue): Types.RGBValue | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r},${g},${b})`;
  }
  return null;
};

// given a directory path string and an empty string array, returns a
// string array containing all files under the given path
//
export const getAllFiles = (dirPath: string, arrayOfFiles: string[]): string[] => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file): void {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });
  return arrayOfFiles;
};

// search out all availible modules under a path and return an
// array of objects which contains file descriptors for each file
//
export const collectFiles = (inPath: string): Types.FileDescriptor[] => {
  const af = getAllFiles(inPath, []);
  const fd: Types.FileDescriptor[] = [];

  af.forEach((mod) => {
    // strip extension and set export filename based on directory
    // filenames are created based on inPath, their directory and
    // the subdirectory they are under.
    //
    // ie: brands/core/red -> core-red.scss
    //     tokens/spacing --> tokens-spacing.scss
    //
    const moduleImportName = mod.replace(/\..+$/, '');
    const parentDirectoryName = path.dirname(mod).split(path.sep).pop();
    const fileBaseName = path.parse(mod).name;
    const exportFileName = `${parentDirectoryName}-${fileBaseName}`;

    if (fileBaseName === 'index') return;

    fd.push({
      m: moduleImportName,
      pd: parentDirectoryName || '',
      bn: fileBaseName,
      efn: exportFileName,
    });
  });

  return fd;
};
