import fs from 'fs';
import { getFileDescriptors } from './lib/file';
import exportCsv from './lib/exportCsv';
import exportJson from './lib/exportJson';
import exportCssVars from './lib/exportCssVars';
import exportScssVars from './lib/exportScssVars';

const INPUT_PATH = `${process.cwd()}/src/`;
const OUTPUT_PATH = 'dist';
const INPUT_TYPES = ['themes', 'tokens'];
const EXPORT_TYPES = ['csv', 'json', 'css-vars', 'scss'];

// main token export function, returns exit status (0 success, 1 failure)
const tokenExporter = (inputType: string, exportType: string): number => {
  const fileData = getFileDescriptors(INPUT_PATH + inputType);
  const outputPath = `${OUTPUT_PATH}/${exportType}`;

  switch (exportType) {
    case 'csv':
      return exportCsv(fileData, outputPath);
    case 'json':
      return exportJson(fileData, outputPath);
    case 'scss':
      return exportScssVars(fileData, outputPath);
    default:
      return 0;
  }
};

// main token export function, returns exit status (0 success, 1 failure)
const cssVarExporter = (inputType: string): number => {
  const fileData = getFileDescriptors(INPUT_PATH + inputType);
  const outputPath = `${OUTPUT_PATH}/css-vars`;

  return exportCssVars(fileData, outputPath);
};

(() => {
  // create dist/exportType output path if it does not exist
  for (const type of EXPORT_TYPES) {
    const path = `${OUTPUT_PATH}/${type}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

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

  let res;
  if (exportType === 'css-vars') {
    res = cssVarExporter(inputType);
  } else {
    res = tokenExporter(inputType, exportType);
  }

  process.exit(res);
})();
