import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = './dist';

function getAllFiles(dirPath: string, arrayOfFiles: string[]) {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

async function loadTheme(file: string) {
  const tsData = await import(`${file}`).catch((error) => {
    console.error(error);
    process.exit(1);
  });
  return tsData.default;
}

const build = async (themeModule: string, outputType: string) => {
  if (outputType === 'scss') {
    await loadTheme(themeModule).then((theme) => {
      Object.keys(theme.tokens).forEach((k) => {
        const fn = `${OUTPUT_DIR}/${theme.name}-${k}.scss`;
        let vars = '';

        Object.entries(theme.tokens[k]).forEach(([t, v]) => {
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
  } // scss output
  return 0;
};

export const cli = () => {
  if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');

  const themeFiles = getAllFiles('./brands/', []);
  console.log(themeFiles)

  const help = (error: string) => {
    console.log(` error: ${error}`);
    console.log('-------------------------------------------------------------');
    console.log(' usage :: yarn build outputType');
    console.log('          where outputType is one of: scss or sketch');
    console.log('-------------------------------------------------------------');
    process.exit(1);
  };

  const args = process.argv.slice(2);
  if (args.length <= 0 || args[1] !== ('scss' || 'sketch')) help('invalid outputType');

  const input = args[0];
  const outputType = args[1];
  const inputName = path.parse(input).name;
  const inputPath = path.parse(input).dir;
  const themeModuleFilepath = './' + inputPath + '/' + inputName;

  if (!fs.existsSync(input)) {
    help('file does not exist or is of improper type');
  } else {
    build(themeModuleFilepath, outputType);
  }
};

cli();
