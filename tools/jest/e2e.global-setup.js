const StaticServer = require('static-server');
const chalk = require('chalk');
const childProcess = require('child_process');

const APP_PORT = 3001;

function buildApp() {
  process.stdout.write(chalk.green('\nBuilding docs site in production mode...\n'));
  childProcess.execSync('yarn build', {
    stdio: ['ignore', 'ignore', process.stderr]
  });
  process.stdout.write(chalk.green('done ✓'));
}

async function startServer() {
  process.stdout.write(chalk.green('\nStarting local server hosting production build...'));
  const server = new StaticServer({
    rootPath: './docs',
    port: APP_PORT
  });

  await new Promise(resolve => {
    server.start(() => resolve());
  });

  global.__SERVER__ = server;
  process.stdout.write(chalk.green('done ✓'));
}

module.exports = async function() {
  if (!process.env.SKIP_BUILD) {
    buildApp();
  } else {
    process.stdout.write('\n');
    process.stdout.write(chalk.yellow('Skipping build and using existing build instead ⚠️'));
  }
  await startServer();
  process.stdout.write('\n\n');
};
