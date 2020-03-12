/**
 * Just some utility functions to log things.
 * Via: github.com/18F/web-design-standards-docs
 */
const pkg = require('../../package.json');
const log = require('fancy-log');
const chalk = require('chalk');
const notifier = require('node-notifier');

function drawFlag() {
  // American Flag in ASCII
  log('');
  log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'));
  log(chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'));
  log(chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'));
  log(chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'));
  log(chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'));
  log(chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'));
  log('');
}

function notify(title, message, wait) {
  notifier.notify({
    title: title,
    message: message,
    icon: 'assets/img/favicons/favicon-192.png',
    wait: wait
  });
}

module.exports = {
  log,

  logIntroduction: function(message) {
    message = message || 'CMS.gov Design System';

    log(chalk.cyan(pkg.name), message);
    drawFlag();
  },

  logData: function(name, message) {
    log(chalk.cyan(name), chalk.yellow(message));
  },

  logError: function(name, message) {
    log(chalk.red(name), chalk.yellow(message));
    notify(pkg.name + ' gulp ' + name, message, true);
  },

  logTask: function(name, message) {
    log(chalk.cyan(name), chalk.green(message));
    notify(pkg.name + ' gulp ' + name, message, false);
  }
};
