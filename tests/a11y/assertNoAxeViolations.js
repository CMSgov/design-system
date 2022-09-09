/* global driver, AxeBuilder */
const { RULESET_ALL } = require('./constants');
const chalk = require('chalk');
const log = require('fancy-log');

function impactColor(impact) {
  switch (impact) {
    case 'critical':
    case 'serious':
      return chalk.redBright;
    case 'moderate':
    default:
      return chalk.yellowBright;
  }
}

// Can't use console.log because Jest will output a bunch of metadata
function println(line = '', indentation = 4) {
  process.stdout.write(' '.repeat(indentation) + line + '\n');
}

function printViolation({ id, impact, nodes, ...rest }) {
  const color = impactColor(impact);
  println(color(`● ${id} (${impact})`));
  Object.keys(rest).forEach((key) => {
    println(`${key}: ${rest[key]}`, 6);
  });
  println('nodes:', 6);
  println();
  nodes.forEach(({ failureSummary, ...rest }) => {
    println(`● ${failureSummary}`, 6);
    Object.keys(rest).forEach((key) => {
      println(`${key}: ${rest[key]}`, 8);
    });
    println();
  });
}

function printViolations(violations) {
  println(chalk.bgRed.bold('  Accessibility violations:  '), 0);
  println();
  violations.forEach(printViolation);
}

module.exports = function assertNoAxeViolations({
  url = '',
  disabledRules = [],
  delay = 0,
  title = 'No Title',
} = {}) {
  if (url) {
    return driver
      .get(url)
      .then(() => {
        if (delay > 0)
          return new Promise((resolve) => {
            setTimeout(resolve, delay);
          });
      })
      .then(() => {
        const defaultDisabledRules = ['bypass'];
        return new AxeBuilder(driver)
          .withTags(RULESET_ALL)
          .disableRules(defaultDisabledRules.concat(disabledRules))
          .analyze((err, results) => {
            if (results && results.violations.length >= 1) {
              log(chalk.yellow(`-- title: ${title}`));
              log(chalk.red(`-- url: ${url}`));
              printViolations(results.violations);
            }
            if (err) {
              // ESLint wants us to handle the error directly, but that's what
              // our assertion does below.
            }
            expect(results.violations.length).toBe(0);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
