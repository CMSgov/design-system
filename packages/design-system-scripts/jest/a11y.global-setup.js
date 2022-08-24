require('regenerator-runtime/runtime');
const StaticServer = require('static-server');
const chalk = require('chalk');
const log = require('fancy-log');

const APP_PORT = 3001;

async function startServer() {
  console.log('\n');
  log(chalk.green('Starting local web server in ./storybook-static/ ...'));
  const server = new StaticServer({
    rootPath: './storybook-static/',
    port: APP_PORT,
  });

  await new Promise((resolve) => {
    server.start(() => resolve());
  });

  global.__SERVER__ = server;
  log(chalk.green(`Local web server running on port ${APP_PORT} ✓`));
}

module.exports = async function () {
  await startServer();
};
