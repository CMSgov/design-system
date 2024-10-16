import { join } from 'path';
import { sh, shV } from './utils';

// Get the name of the branch we're on
const branch = sh('git rev-parse --abbrev-ref HEAD');
const urlPath = `/design-system/branch/${branch}`;

// Build the demo site
shV(`yarn --cwd ${join('packages', 'docs')} clean`);
shV(`PATH_PREFIX='${urlPath}' PREFIX_PATHS=true yarn build:docs`);

// Deploy the demo site to a directory on GitHub Pages
shV(`yarn gh-pages -d '${join('packages', 'docs', 'public')}' --dest "branch/${branch}"`);

console.log(`Deployed demo doc site to https://cmsgov.github.io${urlPath}`);
