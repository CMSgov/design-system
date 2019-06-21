/* global driver */
import AxeBuilder from 'axe-webdriverjs';
import { RULESET_ALL } from '../../helpers/e2e/constants';
import { get } from 'lodash';

export default async function assertNoAxeViolations(url) {
  if (url) {
    await driver.get(url);
  }

  await AxeBuilder(driver)
    .withTags(RULESET_ALL)
    .disableRules('bypass')
    .analyze()
    .then(results => {
      const violations = get(results, 'violations', null);
      if (violations.length >= 1) {
        console.log(violations);
      }
      expect(violations.length).toBe(0);
    })
    .catch(err => {
      console.error(err);
    });
}
