import fs from 'fs';
import path from 'path';
import { HexValue, RGBValue, FileDescriptor, PercentageValue } from './types';

// converts an rgb string 'rgb(15,24,128)' to a hex value '#0819A9'
export const rgbToHex = (r: number, g: number, b: number): HexValue => {
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `#${hex}`;
};

/* Table of Alpha Values for 10 bit Hex
 *
 * Alpha% 	Hex	Num
 * ----------------
 * 100%	    FF	255
 * 99%	    FC	252
 * 98%	    FA	250
 * 97%	    F7	247
 * 96%	    F5	245
 * 95%	    F2	242
 * 94%	    F0	240
 * 93%	    ED	237
 * 92%	    EB	235
 * 91%	    E8	232
 * 90%	    E6	230
 * 89%	    E3	227
 * 88%	    E0	224
 * 87%	    DE	222
 * 86%	    DB	219
 * 85%	    D9	217
 * 84%	    D6	214
 * 83%	    D4	212
 * 82%	    D1	209
 * 81%	    CF	207
 * 80%	    CC	204
 * 79%	    C9	201
 * 78%	    C7	199
 * 77%	    C4	196
 * 76%	    C2	194
 * 75%	    BF	191
 * 74%	    BD	189
 * 73%	    BA	186
 * 72%	    B8	184
 * 71%	    B5	181
 * 70%	    B3	179
 * 69%	    B0	176
 * 68%	    AD	173
 * 67%	    AB	171
 * 66%	    A8	168
 * 65%	    A6	166
 * 64%	    A3	163
 * 63%	    A1	161
 * 62%	    9E	158
 * 61%	    9C	156
 * 60%	    99	153
 * 59%	    96	150
 * 58%	    94	148
 * 57%	    91	145
 * 56%	    8F	143
 * 55%	    8C	140
 * 54%	    8A	138
 * 53%	    87	135
 * 52%	    85	133
 * 51%	    82	130
 * 50%	    80	128
 * 49%	    7D	125
 * 48%	    7A	122
 * 47%	    78	120
 * 46%	    75	117
 * 45%	    73	115
 * 44%	    70	112
 * 43%	    6E	110
 * 42%	    6B	107
 * 41%	    69	105
 * 40%	    66	102
 * 39%	    63	99
 * 38%	    61	97
 * 37%	    5E	94
 * 36%	    5C	92
 * 35%	    59	89
 * 34%	    57	87
 * 33%	    54	84
 * 32%	    52	82
 * 31%	    4F	79
 * 30%	    4D	77
 * 29%	    4A	74
 * 28%	    47	71
 * 27%	    45	69
 * 26%	    42	66
 * 25%	    40	64
 * 24%	    3D	61
 * 23%	    3B	59
 * 22%	    38	56
 * 21%	    36	54
 * 20%	    33	51
 * 19%	    30	48
 * 18%	    2E	46
 * 17%	    2B	43
 * 16%	    29	41
 * 15%	    26	38
 * 14%	    24	36
 * 13%	    21	33
 * 12%	    1F	31
 * 11%	    1C	28
 * 10%	    1A	26
 * 9%	      17	23
 * 8%	      14	20
 * 7%	      12	18
 * 6%	      0F	15
 * 5%	      0D	13
 * 4%	      0A	10
 * 3%	      08	8
 * 2%	      05	5
 * 1%	      03	3
 * 0%	      00	0
 *
 * transforms a hex value to an 8 char hex value with opacity given as a number from 0 to 1
 */
export const hexOpacity = (hexVal: HexValue, opacity: number): HexValue => {
  const alpha = Math.round(opacity * 255);
  const alphaHex = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
  return `${hexVal}${alphaHex}`;
};

// converts a hex string '#F3G1AA' to an rgb value string 'rgb(142, 24, 89)'
export const hexToRgb = (hex: HexValue): RGBValue | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r},${g},${b})`;
  }
  return null;
};

// flattens an object while maintaining tree information
export const flatten = (
  obj: Record<string, any>,
  prefix = '',
  res: Record<string, any> = {},
  delim = '.',
  prefixCategory = false
) =>
  Object.entries(obj).reduce((r, [key, val]) => {
    const k = `${prefix}${key}`;
    if (typeof val === 'object') {
      if (prefixCategory) {
        flatten(val, `${k}${delim}`, r, delim);
      } else {
        flatten(val, ``, r, delim);
      }
    } else {
      res[k] = val;
    }
    return r;
  }, res);

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
export const getFileDescriptors = (inPath: string): FileDescriptor[] => {
  const root = `${process.cwd()}/src`;
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
