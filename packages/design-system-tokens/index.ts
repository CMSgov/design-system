import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = './dist';

async function tsToScss(file: string): Promise<string[]> {
  let c = '';
  let s = '';
  if (!file) return ['error'];

  const tsData = await import(file);

  for (const [k, v] of Object.entries(tsData.default.color)) {
    c += `$${k}: ${v};\n`;
  }
  for (const [k, v] of Object.entries(tsData.default.spacing)) {
    s += `$${k}: ${v};\n`;
  }

  return [c, s];
}

function main() {
  if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');

  // first two args are not needed
  const args = process.argv.slice(2);
  if (args.length <= 0) {
    console.warn('__ token tool arguments required __');
    console.log('usage: index.ts infile output_type');
    console.log('output_type can be one of: sketch, scss');
    return 0;
  }

  const input = args[0];
  const inputExt = path.parse(input).ext;
  const inputName = path.parse(input).name;
  const inputPath = path.parse(input).dir;
  const inputAsImport = './' + inputPath + '/' + inputName;

  if (inputExt === '.ts') {
    return tsToScss(inputAsImport).then((fd) => {
      fs.writeFile(`${OUTPUT_DIR}/${inputName}-color.scss`, fd[0], (err): void => {
        if (err)
          console.error(
            `There was an issue writing to ${OUTPUT_DIR}/${inputName}-color.scss: ${err}`
          );
      });
      fs.writeFile(`${OUTPUT_DIR}/${inputName}-spacing.scss`, fd[1], (err): void => {
        if (err)
          console.error(
            `There was an issue writing to ${OUTPUT_DIR}/${inputName}-spacing.scss: ${err}`
          );
      });
    });
  }

  return 1;
}

main();
