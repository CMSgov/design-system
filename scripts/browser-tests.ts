import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { sh } from './utils';
import { spawnSync } from 'node:child_process';

const DOCKER_IMAGE = 'mcr.microsoft.com/playwright:v1.25.0-focal';

function verifyPlaywrightInstalled() {
  try {
    sh('yarn playwright --version');
  } catch (error) {
    console.log('Playwright command is unavailable. Install it with `npx playwright install`.');
    process.exit(1);
  }
}

(async () => {
  // Get command line args
  const argv = await yargs(hideBin(process.argv))
    .scriptName('yarn test:browser')
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

  const envVars: string[] = [];
  if (argv.smoke) {
    envVars.push('SMOKE=true');
  }

  const configArg = `--config ${argv.config}`;
  const extraArgs = argv._.join(' ');
  const playwrightCommand = `yarn playwright test ${configArg} ${extraArgs}`;

  if (argv.docker) {
    const envArgs = envVars.map((assignment) => `--env ${assignment}`).join(' ');
    const dockerCommand = `docker run --rm --network host -v $(pwd):/work/ -w /work/ ${envArgs} ${DOCKER_IMAGE}`;
    sh(`${dockerCommand} ${playwrightCommand}`);
  } else {
    verifyPlaywrightInstalled();
    const envArgs = envVars.join(' ');
    sh(`${envArgs} ${playwrightCommand}`);
  }
})();
