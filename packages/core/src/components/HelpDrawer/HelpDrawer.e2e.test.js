/* global driver */
import { ROOT_URL, RULESET_ALL } from '../../helpers/e2e/constants';
import {
  getElementByClassName,
  getElementById,
  getElementByXPath
} from '../../helpers/e2e';
import AxeBuilder from 'axe-webdriverjs';

const rootURL = `${ROOT_URL}/example/components.help-drawer.react-help-drawer/`;

describe('Help Drawer component', () => {
  it('Should render', async() => {
    await driver.get(rootURL);

    const el = await getElementById('js-example');
    expect(el).toBeTruthy();
  });

  it('Should open the help drawer on click', async() => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="js-example"]/div/span/a');
    el.click();

    el = await getElementByClassName('ds-c-help-drawer');
    expect(el).toBeTruthy();
  });

  it('Should have no accessibility violations', async done => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="js-example"]/div/span/a');
    el.click();

    el = await getElementByClassName('ds-c-help-drawer');

    await AxeBuilder(driver)
      .withTags(RULESET_ALL)
      .disableRules('bypass')
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
