/* global driver */
import AxeBuilder from 'axe-webdriverjs';
import { RULESET_ALL } from '../../helpers/e2e/constants';

export default async function assertNoAxeViolations(url, disabledRules = []) {
  if (url) {
    await driver.get(url);
  }
  const defaultDisabledRules = ['bypass'];

  await AxeBuilder(driver)
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
}
