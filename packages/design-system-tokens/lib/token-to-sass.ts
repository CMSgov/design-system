import * as fs from 'fs';
import * as u from './utility';

const toScss = async (mod: string, filename: string, outputPath: string) => {
  await u.loadTSData(mod).then((m) => {

    Object.keys(m).forEach((k) => {
      const fn = `${outputPath}/${filename}-${k}.scss`;
      let vars = '';

      Object.entries(m[k]).forEach(([t, v]) => {
        vars += `$${t}: ${v};\n`;
      });

      try {
        fs.writeFileSync(fn, vars);
        console.log(`:: wrote ${fn}`);
      } catch (err) {
        console.error(`There was an issue writing to ${fn}: ${err}`);
      }
    });

  });
}

export default toScss
