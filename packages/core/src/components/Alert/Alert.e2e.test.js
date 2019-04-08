/* global driver */
import { ROOT_URL, RULESET_ALL } from '../../helpers/e2e/constants';
import AxeBuilder from 'axe-webdriverjs';
import { getElementByClassName } from '../../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.alert.react/`;

describe('Alert component', () => {
  it('Should render', async() => {
    await driver.get(rootURL);

    const el = await getElementByClassName('ds-c-alert');
    expect(el).toBeTruthy();
  });

  it('Should have no accessibility violations', async done => {
    await driver.get(rootURL);

    await AxeBuilder(driver)
      .withTags(RULESET_ALL)
      .analyze((err, results) => {
        if (err) {
          console.log(err);
        }
        if (results.violations.length >= 1) {
          console.log(results.violations);
        }
        expect(results.violations.length).toBe(0);
        done();
      });
  });
});
