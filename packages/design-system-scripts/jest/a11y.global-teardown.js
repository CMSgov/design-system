const chalk = require('chalk');
const log = require('fancy-log');

module.exports = async function () {
  log(chalk.green('Shutting down local web server...'));
  global.__SERVER__.stop();
  log(chalk.green('Web server shutdown complete ✓'));
};
