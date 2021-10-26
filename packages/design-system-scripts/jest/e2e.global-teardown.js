const chalk = require('chalk');
const log = require('fancy-log');

module.exports = async function () {
  log(chalk.green('\nShutting down local server...'));
  global.__SERVER__.stop();
  log(chalk.green('done ✓'));
  log('\n');
};
