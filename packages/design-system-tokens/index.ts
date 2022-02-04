import * as fs from 'fs';
import * as u from './lib/utility';
import exportScss from './lib/token-to-sass'

const OUTPUT_DIR = './dist';

// main token export function, returns a promise with a number to describe
// the exit status (0 success, 1 failure) of the operation performed
//
const tokenExporter = async (
  contentType: string,
  exportType: string,
  outPath: string
  ): Promise<number> => {

    const fileData = contentType === 'tokens'
      ? u.collectFiles('tokens')
      : u.collectFiles('brands');

    if (exportType === 'scss')
        return exportScss(fileData, outPath)
    // if (exportType === 'sketch')
    //     return exportSketch(fileData, outPath)

    return 1;
}


((): void => {

  if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');

  const help = (error: string) => {
    console.log(` error: ${error}`);
    console.log('-------------------------------------------------------------');
    console.log(' usage :: yarn build themes outputType // export themes');
    console.log(' usage :: yarn build tokens outputType // export main tokens');
    console.log('          where outputType is one of: scss, sketch');
    console.log('-------------------------------------------------------------');
    process.exit(1);
  };

  const args = process.argv.slice(2);
  if (args.length <= 0 || args[1] !== ('scss' || 'sketch')) help('invalid outputType');

  const contentType = args[0];
  const exportType = args[1];

  tokenExporter(contentType, exportType, OUTPUT_DIR).then(res => {
    process.exit(res);
  });

})();
