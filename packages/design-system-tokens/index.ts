import * as fs from 'fs';
import * as u from './lib/utility';
import exportScss from './lib/exportScss';

const OUTPUT_DIR = './dist';

// main token export function, returns a promise with a number to describe
// the exit status (0 success, 1 failure) of the operation performed
//
const tokenExporter = (contentType: string, exportType: string, outPath: string): number => {
  const fileData = contentType === 'tokens' ? u.collectFiles('tokens') : u.collectFiles('brands');

  switch (exportType) {
    case 'scss':
      return exportScss(fileData, outPath);
    default:
      return 0;
  }
  // if (exportType === 'sketch')
  //     return exportSketch(fileData, outPath)
};

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
  if (args.length <= 0) help('no arguments provided');
  if (!['themes', 'tokens'].includes(args[0])) help('must be themes or tokens');
  if (!['scss', 'sketch'].includes(args[1])) help('missing ouptut type, should be scss or sketch');

  const contentType = args[0];
  const exportType = args[1];

  const res = tokenExporter(contentType, exportType, OUTPUT_DIR);

  process.exit(res);
})();
