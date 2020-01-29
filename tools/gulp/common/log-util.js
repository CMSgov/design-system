/**
 * Just some utility functions to log things.
 * Via: github.com/18F/web-design-standards-docs
 */
const pkg = require('../../../package.json');
const log = require('fancy-log');
const c = require('ansi-colors');
const notifier = require('node-notifier');

const shellPrefix = '$';

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
    log(c.yellow(pkg.name), message);
  },

  logCommand: function(name, message) {
    log(shellPrefix, c.cyan(name), c.magenta(message));
  },

  logHelp: function(name, message) {
    log(shellPrefix, c.cyan(name), c.yellow(message));
  },

  logData: function(name, message) {
    log(c.cyan(name), c.yellow(message));
  },

  logError: function(name, message) {
    log(c.red(name), c.yellow(message));
    notify(this.dirName + ' gulp ' + name, message, true);
  },

  logMessage: function(name, message) {
    log(c.cyan(name), c.green(message));
    notify(this.dirName + ' gulp ' + name, message, false);
  }
};
