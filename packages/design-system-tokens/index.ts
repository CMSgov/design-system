import * as fs from 'fs';
import buildSass from './buildsass';

const OUTPUT_DIR = './dist';

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
  if (args.length < 0 || args[1] !== ('scss' || 'sketch')) help('invalid outputType');

  const contentType = args[0];
  const exportType = args[1];

  if (contentType === 'themes') {
    switch (exportType) {
      case 'scss':
        buildSass.themes(OUTPUT_DIR);
        break;
    }
  } else if (contentType === 'tokens') {
    switch (exportType) {
      case 'scss':
        buildSass.tokens(OUTPUT_DIR);
        break;
    }
  }
})();
