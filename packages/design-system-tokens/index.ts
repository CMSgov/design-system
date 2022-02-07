import * as fs from 'fs';
import * as u from './lib/utility';
import exportScss from './lib/exportScss';

const OUTPUT_PATH = './dist';
const INPUT_TYPES = ['brands', 'tokens'];
const EXPORT_TYPES = ['scss', 'sketch'];

// main token export function, returns exit status (0 success, 1 failure)
//
const tokenExporter = (inputType: string, exportType: string): number => {
  const fileData = u.collectFiles(inputType);

  switch (exportType) {
    case 'scss':
      return exportScss(fileData, OUTPUT_PATH);
    default:
      return 0;
  }
  // TODO: implement sketch exporting
  //  return exportSketch(fileData, outPath)
};

(() => {
  // create dist output path if it does not exist
  if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH);

  const help = (error: string) => {
    console.log(`\n error: ${error}`);
    console.log('-------------------------------------------------------------');
    console.log(' usage : yarn build input_type output_type');
    console.log(`         where input_type can be ${INPUT_TYPES}`);
    console.log(`         and output_type can be ${EXPORT_TYPES}`);
    console.log('-------------------------------------------------------------\n');
    process.exit(1);
  };

  // throw away first two entries in process.argv
  const args = process.argv.slice(2);
  if (args.length <= 0) help('no arguments provided');
  if (!INPUT_TYPES.includes(args[0])) help(`valid import types are: ${INPUT_TYPES}`);
  if (!EXPORT_TYPES.includes(args[1])) help(`valid export types are: ${EXPORT_TYPES}`);

  const inputType = args[0];
  const exportType = args[1];

  const res = tokenExporter(inputType, exportType);

  process.exit(res);
})();
