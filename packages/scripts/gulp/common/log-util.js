/**
 * Just some utility functions to log things.
 * Via: github.com/18F/web-design-standards-docs
 */
const pkg = require('../../../package.json');
const gutil = require('gulp-util');
const chalk = gutil.colors;
const notifier = require('node-notifier');

const shellPrefix = '$';

function drawFlag() {
  // American Flag in ASCII
  gutil.log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  gutil.log(
    chalk.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
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
  dirName: pkg.name,

  logIntroduction: function(message) {
    message = message || 'CMS.gov Design System';

    gutil.log(chalk.yellow(pkg.name), message);
    drawFlag();
  },

  logCommand: function(name, message) {
    gutil.log(shellPrefix, chalk.cyan(name), chalk.magenta(message));
  },

  logHelp: function(name, message) {
    gutil.log(shellPrefix, chalk.cyan(name), chalk.yellow(message));
  },

  logData: function(name, message) {
    gutil.log(chalk.cyan(name), chalk.yellow(message));
  },

  logError: function(name, message) {
    gutil.log(chalk.red(name), chalk.yellow(message));
    notify(this.dirName + ' gulp ' + name, message, true);
  },

  logMessage: function(name, message) {
    gutil.log(chalk.cyan(name), chalk.green(message));
    notify(this.dirName + ' gulp ' + name, message, false);
  }
};
