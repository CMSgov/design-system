import * as fs from 'fs';
import * as u from './utility';
import * as Types from './types';

// Takes an array of file descriptors with the properties:
// {
//   m: moduleImportName,
//   pd: parentDirectoryName,
//   bn: fileBaseName,
//   efn: exportFileName
// }
// and writes their imported data to filesystem
//
export const exportScss = async(fd: Types.FileDescriptor[], outPath: string): Promise<number> => {
  fd.forEach((m) => {
    exportScssFile(m.m, m.bn, outPath)
  });
  return 0
}

export const exportScssFile = (mod: string, filename: string, outputPath: string): number => {
  u.loadTSData(mod).then((m: Types.ImportTypes) => {

    Object.keys(m).forEach((k) => {
      const fn = `${outputPath}/${filename}-${k}.scss`;
      let vars = '';

      Object.entries(m[k]).forEach(([t, v]) => {
        vars += `$${t}: ${v};\n`;
      });

      try {
        fs.writeFileSync(fn, vars);
        console.log(`:: wrote ${fn}`);
        return 0
      } catch (err) {
        console.error(`There was an issue writing to ${fn}: ${err}`);
        return 1
      }
    });

  });
  return 1
}

export default exportScss
