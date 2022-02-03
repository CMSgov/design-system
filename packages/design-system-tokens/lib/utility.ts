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



export const loadTSData = async (file: string): Promise<Types.ImportTypes> => {
  const tsData = await import(`../${file}`).catch((error) => {
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

const exportScss = async(fd: {}[]): Promise<number> => {
  return 1
}

const exportSketch = async(fd: {}[]): Promise<number> => {
  return 0
}


// search out all availible token files in a path and build them
//
export const collectFiles = (inPath: string) => {
  const af = getAllFiles(inPath, []);
  const fd = [{}];

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
      pd: parentDirectoryName,
      bn: fileBaseName,
      efn: exportFileName
    });
  });

  return fd;
};

export const tokenExporter = async (
  contentType: string,
  exportType: string,
  outPath: string
  ): Promise<number> => {

    const fileData = contentType === 'tokens'
      ? collectFiles('tokens')
      : collectFiles('brands');

    if (exportType === 'scss')
        return exportScss(fileData)
    if (exportType === 'sketch')
        return exportSketch(fileData)

    return 1;
}
