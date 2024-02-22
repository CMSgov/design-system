import path from 'path';
import writeFiles from './writeFiles';
import { readTokenFiles } from '../lib/tokens';
import { tokenFilesToCssFiles } from './exportCssVars';
import { tokenFilesToScssFiles, tokenFilesToScssLayoutFiles } from './exportScssVars';

const TOKENS_DIR = path.join(process.cwd(), 'src', 'tokens');
const DIST_DIR = 'dist';

(async () => {
  try {
    const tokensByFile = readTokenFiles(TOKENS_DIR);
    await Promise.all([
      writeFiles(`${DIST_DIR}/css-vars`, tokenFilesToCssFiles(tokensByFile)),
      writeFiles(`${DIST_DIR}/css-vars`, tokenFilesToScssLayoutFiles(tokensByFile)),
      writeFiles(`${DIST_DIR}/scss`, tokenFilesToScssFiles(tokensByFile)),
    ]);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
})();
