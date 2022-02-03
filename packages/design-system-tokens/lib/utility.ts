import * as fs from 'fs';
import * as path from 'path';
import * as Types from './types';

export const RgbToHex = (r: number, g: number, b: number): Types.HexValue => {
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `#${hex}`;
};

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

export const loadTheme = async (file: string): Promise<Types.ImportTypes> => {
  const tsData = await import(`${file}`).catch((error) => {
    console.error(error);
    process.exit(1);
  });
  return tsData.default;
};

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
