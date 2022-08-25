import { execSync, spawnSync } from 'child_process';
import path from 'path';

// Get the name of the branch we're on
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// Build the demo site
// Need to use spawnSync instead of execSync for 'yarn' to be found consistently. When using
// spawn, the command is executed in the same environment as this process, which means we're
// guaranteed to have access to yarn and node in the PATH. The exec function, on the other
// hand, will execute it in whatever it determines shoudl be the default shell.
spawnSync('yarn', ['--cwd', path.join('packages', 'docs'), 'clean'], { stdio: 'inherit' });
spawnSync('yarn', ['build-storybook:gatsby'], { stdio: 'inherit' });
spawnSync('yarn', ['build:docs'], {
  env: {
    ...process.env,
    PATH_PREFIX: `/design-system/branch/${branch}`,
    PREFIX_PATHS: 'true',
    stdio: 'inherit',
  },
});

// Deploy the demo site to a directory on GitHub Pages
spawnSync(
  `yarn`,
  [
    'gh-pages',
    '-d',
    `'${path.join('packages', 'docs', 'public')}'`,
    '--dest',
    '"branch/${branch}"',
  ],
  { stdio: 'inherit' }
);

console.log(`Deployed demo doc site to https://cmsgov.github.io/design-system/branch/${branch}`);
