/* global driver, axeBuilder */
const { RULESET_ALL } = require('./constants');

module.exports = async function assertNoAxeViolations(url, disabledRules = []) {
  if (url) {
    await driver.get(url);
  }
  const defaultDisabledRules = ['bypass'];

  await axeBuilder(driver)
    .withTags(RULESET_ALL)
    .disableRules(defaultDisabledRules.concat(disabledRules))
    .analyze((err, results) => {
      if (err) {
        console.error(err);
      }
      if (results.violations.length >= 1) {
        console.log(results.violations);
      }
      expect(results.violations.length).toBe(0);
    });
};
