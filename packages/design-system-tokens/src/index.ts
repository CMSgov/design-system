import fs from 'fs';
import { getFileDescriptors } from './lib/utility';
import exportScss from './lib/exportScss';
import exportCsv from './lib/exportCsv';
import exportJson from './lib/exportJson';

const OUTPUT_PATH = 'dist';
const INPUT_TYPES = ['themes', 'tokens'];
const EXPORT_TYPES = ['sass', 'scss', 'csv', 'json'];

// main token export function, returns exit status (0 success, 1 failure)
const tokenExporter = (inputType: string, exportType: string): number => {
  const fileData = getFileDescriptors(inputType);

  switch (exportType) {
    case 'scss':
    case 'sass':
      return exportScss(fileData, OUTPUT_PATH);
    case 'csv':
      return exportCsv(fileData, OUTPUT_PATH);
    case 'json':
      return exportJson(fileData, OUTPUT_PATH);
    default:
      return 0;
  }
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

  if (args.length <= 1) help('not enough arguments provided');

  const inputType = args[0].toLowerCase();
  const exportType = args[1].toLowerCase();

  if (!INPUT_TYPES.includes(inputType)) help(`valid import types are: ${INPUT_TYPES}`);
  if (!EXPORT_TYPES.includes(exportType)) help(`valid export types are: ${EXPORT_TYPES}`);

  const res = tokenExporter(inputType, exportType);

  process.exit(res);
})();
