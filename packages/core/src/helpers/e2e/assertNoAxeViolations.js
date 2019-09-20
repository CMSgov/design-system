/* global driver */
import AxeBuilder from 'axe-webdriverjs';
import { RULESET_ALL } from '../../helpers/e2e/constants';

export default async function assertNoAxeViolations(url) {
  if (url) {
    await driver.get(url);
  }

  await AxeBuilder(driver)
    .withTags(RULESET_ALL)
    .disableRules('bypass')
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
