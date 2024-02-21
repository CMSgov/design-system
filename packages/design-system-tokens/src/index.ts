import exportCssVars from './lib/exportCssVars';
import exportScssVars from './lib/exportScssVars';
import { getFileDescriptors } from './lib/file';

const INPUT_PATH = `${process.cwd()}/src/`;
const DIST_DIR = 'dist';

(() => {
  try {
    const fileData = getFileDescriptors(INPUT_PATH);
    exportCssVars(fileData, `${DIST_DIR}/css-vars`);
    exportScssVars(fileData, `${DIST_DIR}/scss`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
})();
