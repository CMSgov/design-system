import * as fs from 'fs';
import * as path from 'path';
import * as Types from './lib/types';

const OUTPUT_DIR = './dist';

async function loadTheme(file: string): Promise<Types.Theme> {
  const tsData = await import(`${file}`).catch((error) => {
    console.error(error);
    process.exit(1);
  });
  return tsData.default;
}

export const build = () => {
  if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');

  const args = process.argv.slice(2);
  if (args.length <= 0) {
    console.log('usage: yarn build:themeName outputType');
    console.log('where themeName is the name of the theme file name');
    console.log('and outputType is one of: scss or sketch');
    return 0;
  }

  const input = args[0];
  const outputType = args[1];
  const inputName = path.parse(input).name;
  const inputPath = path.parse(input).dir;
  const inputAsImport = './' + inputPath + '/' + inputName;

  if (outputType === 'scss') {
    return loadTheme(inputAsImport).then((fd) => {
      console.log(Object.keys(fd.tokens.color));
      // fs.writeFile(`${OUTPUT_DIR}/${inputName}-color.scss`, fd[0], (err): void => {
      //   if (err)
      //     console.error(
      //       `There was an issue writing to ${OUTPUT_DIR}/${inputName}-color.scss: ${err}`
      //     );
      // });
      // fs.writeFile(`${OUTPUT_DIR}/${inputName}-spacing.scss`, fd[1], (err): void => {
      //   if (err)
      //     console.error(
      //       `There was an issue writing to ${OUTPUT_DIR}/${inputName}-spacing.scss: ${err}`
      //     );
      // });
    });
  }

  return 1;
};

build();
