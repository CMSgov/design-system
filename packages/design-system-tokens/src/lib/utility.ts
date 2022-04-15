import fs from 'fs';
import path from 'path';
import { ColorTokens, HexValue, RGBValue, RGBAValue, FileDescriptor } from './types';

// converts an rgb string 'rgb(15,24,128)' to a hex value '#0819A9'
export const rgbToHex = (r: number, g: number, b: number): HexValue => {
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `#${hex}`;
};

// transforms a hex value to an 8 char hex value with opacity given as a number
export const hexOpacity = (hexVal: string, opacity: number): HexValue => {
  const percent = Math.max(0, Math.min(100, opacity));
  const intVal = Math.round((percent / 100) * 255);
  const hexOpacity = intVal.toString(16).padStart(2, '0');
  return `${hexVal}${hexOpacity}` as HexValue;
};

/*
 * converts a hex string '#F3G1AA' to an rgb value string 'rgb(142, 24, 89)'
 * if an optional opacity value is passed the rgba value will be returned
 */
export const hexToRgbString = (hex: HexValue, opacity = 100): RGBValue | RGBAValue => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    const rgb: RGBValue | RGBAValue =
      opacity > 100 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${opacity})`;
    return rgb;
  }
  // should never happen with type checks, but will return near-black if there was an error
  // with the conversion, somewhat unique value, 1,1,1 can be checked for to detect errors
  return 'rgb(1,1,1)';
};

/*
 * converts a hex string '#F3G1AA' to an rgb value array [142, 24, 89]'
 */
export const hexToRgbArray = (hex: HexValue): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return [r, g, b];
  }
  // should never happen with type checks, but will return near-black if there was an error
  // with the conversion, somewhat unique value, 1,1,1 can be checked for to detect errors
  return [1, 1, 1];
};

/*
 * returns the lab value for an rgb value as an array
 */
export const rgb2lab = (rgb: number[]): number[] => {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};

/*
 * rgbArrayDiff uses the 1994 implementation of the DeltaE function to compute the euclidian
 * difference between two rgb values provided as an array of rgb values 0 - 255.
 * returns a value of 1-100 which is the perceptual difference between the two colors.
 *
 *  <= 1.0 - Not peceptible by human eyes
 *  1-2    - Perceptible through close observatio
 *  2-10   - Perceptible at a glance
 *  11-49  - Colors are more similar than opposite
 *  100    - Colors are exact opposite
 *
 */
export const rgbArrayDiff = (rgbA: number[], rgbB: number[]): number => {
  const labA = rgb2lab(rgbA);
  const labB = rgb2lab(rgbB);
  const deltaL = labA[0] - labB[0];
  const deltaA = labA[1] - labB[1];
  const deltaB = labA[2] - labB[2];
  const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  const deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  const sc = 1.0 + 0.045 * c1;
  const sh = 1.0 + 0.015 * c1;
  const deltaLKlsl = deltaL / 1.0;
  const deltaCkcsc = deltaC / sc;
  const deltaHkhsh = deltaH / sh;
  const i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
};

// flattens an object into one dimension
export const flatten = (obj: Record<string, any>, initialObject: Record<string, any> = {}) =>
  Object.entries(obj).reduce((accumulator, [key, val]) => {
    if (typeof val === 'object') {
      flatten(val, accumulator);
    } else {
      initialObject[key] = val;
    }
    return accumulator;
  }, initialObject);

/*
 * given a directory path string and an empty string array, returns a
 * string array containing all files under the given path
 */
export const getAllFiles = (dirPath: string, arrayOfFiles: string[]): string[] => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file): void {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
};

/*
 * search out all availible modules under a path and return an
 * array of objects which contains file descriptors for each file
 */
export const getFileDescriptors = (
  inPath: string,
  root = `${process.cwd()}/src`
): FileDescriptor[] => {
  const allFiles = getAllFiles(`${root}/${inPath}`, []);
  const fileDescriptors: FileDescriptor[] = [];

  allFiles.forEach((mod) => {
    /*
     * strip extension and set export filename based on directory
     * filenames are created based on inPath, their directory and
     * the subdirectory they are under.
     *
     * ie: themes/core/red -> core-red.scss
     *     tokens/spacing --> tokens-spacing.scss
     */
    const moduleImportName = mod.replace(/\..+$/, '');
    const parentDirectoryName = path.dirname(mod).split(path.sep).pop();
    const fileBaseName = path.parse(mod).name;
    const exportFileName = `${parentDirectoryName}-${fileBaseName}`;

    if (fileBaseName === 'index') return;

    fileDescriptors.push({
      moduleImportName: moduleImportName,
      parentDirectoryName: parentDirectoryName || '',
      fileBaseName: fileBaseName,
      exportFileName: exportFileName,
    });
  });

  return fileDescriptors;
};

// writes a file to filename with content vars
export const writeFile = (filename: string, vars: string) => {
  try {
    fs.writeFileSync(filename, vars);
    console.log(`:: wrote ${filename}`);
  } catch (err) {
    console.error(`There was an issue writing to ${filename}: ${err}`);
    process.exit(1);
  }
};
