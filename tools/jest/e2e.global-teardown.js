const chalk = require('chalk');

module.exports = async function() {
  process.stdout.write(chalk.green('\nShutting down local server...'));
  global.__SERVER__.stop();
  process.stdout.write(chalk.green('done ✓'));

  process.stdout.write('\n');
};
