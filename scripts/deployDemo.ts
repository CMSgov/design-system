import { execSync, spawnSync } from 'child_process';
import path from 'path';

// Get the name of the branch we're on
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// Build the demo site
spawnSync('yarn', ['--cwd', path.join('packages', 'docs'), 'clean']);
spawnSync('yarn', ['build-storybook:gatsby']);
spawnSync('yarn', ['build:docs'], {
  env: {
    ...process.env,
    PATH_PREFIX: `/design-system/branch/${branch}`,
    PREFIX_PATHS: 'true',
  },
});

// Deploy the demo site to a directory on GitHub Pages
execSync(`yarn gh-pages -d '${path.join('packages', 'docs', 'public')}' --dest "branch/${branch}"`);

console.log(`Deployed demo doc site to https://cmsgov.github.io/design-system/branch/${branch}`);
