require('regenerator-runtime/runtime');
const StaticServer = require('static-server');
const chalk = require('chalk');
const childProcess = require('child_process');
const log = require('fancy-log');

const APP_PORT = 3001;

function buildApp() {
  log(chalk.green('\nBuilding docs site in production mode...\n'));
  // Build files in production while ignoring rootPath
  childProcess.execSync(process.env.BUILD_COMMAND || 'yarn build:docs', {
    stdio: ['ignore', 'ignore', process.stderr],
  });
  log(chalk.green('done ✓'));
}

async function startServer() {
  log(chalk.green('\nStarting local server hosting production build...'));
  const server = new StaticServer({
    rootPath: process.env.BUILD_PATH,
    port: APP_PORT,
  });

  await new Promise((resolve) => {
    server.start(() => resolve());
  });

  global.__SERVER__ = server;
  log(chalk.green('done ✓'));
}

module.exports = async function () {
  if (process.env.SKIP_BUILD === 'true') {
    log('\n');
    log(chalk.yellow('Skipping build and using existing build instead ⚠️'));
  } else {
    buildApp();
  }
  await startServer();
  log('\n\n');
};
