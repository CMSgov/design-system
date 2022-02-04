import * as fs from 'fs';
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
export const exportScss = (fd: Types.FileDescriptor[], outPath: string): number => {
  fd.forEach((m) => {
    let md = require(`../${m.m}`)

    // if does not contain top level theme def one loop, otherwise 2

    Object.keys(md.default).forEach((k) => {
      const fn = `${outPath}/${m.bn}-${k}.scss`;
      let vars = '';

      Object.entries(md.default[k]).forEach(([t, v]) => {
        vars += `$${t}: ${v};\n`;
      });

      try {
        fs.writeFileSync(fn, vars);
        console.log(`:: wrote ${fn}`);
      } catch (err) {
        console.error(`There was an issue writing to ${fn}: ${err}`);
        process.exit(1)
      }
    });
  });
  return 0
}

export default exportScss
