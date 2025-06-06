import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { sh, shI } from './utils';

const DOCKER_IMAGE = 'mcr.microsoft.com/playwright:v1.49.1-noble';

function verifyPlaywrightInstalled() {
  try {
    sh('npx playwright --version');
  } catch (error) {
    console.log('Playwright command is unavailable. Install it with `npx playwright install`.');
    process.exit(1);
  }
}

(async () => {
  // Get command line args
  const argv = await yargs(hideBin(process.argv))
    .scriptName('npm run test:browser')
    .parserConfiguration({ 'unknown-options-as-args': true })
    .options({
      // Note that you can negate it with --no-build
      build: {
        boolean: true,
        description: 'Builds storybook first',
        default: true,
      },
      config: {
        string: true,
        description: 'Path to Playwright config file',
        default: 'tests/browser/playwright.config.ts',
      },
      docker: {
        boolean: true,
        description: 'Runs tests inside Playwright Docker container',
        default: true,
      },
      smoke: {
        boolean: true,
        description: 'Runs only the smoke tests',
        default: false,
      },
    })
    .help().argv;

  // Build whatever is necessary to run these tests
  if (argv.build) {
    if (argv.config.includes('examples.config.ts')) {
      shI('npm', ['run', 'build:examples']);
    } else {
      shI('npm', ['run', 'build:storybook']);
    }
  }

  // Create the array of args for the playwright command
  const configArgs = ['--config', argv.config];
  const extraArgs = argv._.map((v) => '' + v);
  const playwrightArgs = ['test', ...configArgs, ...extraArgs];

  let result;
  if (argv.docker) {
    // Create the array of args for the docker command
    const dockerArgs = [
      ...['run', '--rm', '--network', 'host', '-v', `${process.cwd()}:/work/`, '-w', '/work/'],
      // Environment vars need to be passed to the docker container
      ...(argv.smoke ? ['--env', 'SMOKE=true'] : []),
      DOCKER_IMAGE,
      ...['npx', 'playwright', ...playwrightArgs],
    ];

    // And run docker
    result = shI('docker', dockerArgs);
  } else {
    // To run outside of docker, we need to have Playwright installed separately
    verifyPlaywrightInstalled();

    // Environment vars need to be passed to the spawned process through the config object
    let config;
    if (argv.smoke) {
      config = {
        env: {
          ...process.env,
          SMOKE: 'true',
        },
      };
    }

    // Run Playwright directly through npm
    result = shI('npx', ['playwright', ...playwrightArgs], config);
  }

  if (result.error || result.status !== 0) {
    process.exit(result.status || 1);
  }
})();
