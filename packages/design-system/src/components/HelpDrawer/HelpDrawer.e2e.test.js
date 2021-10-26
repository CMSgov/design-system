/* global driver */
import {
  getElementByClassName,
  getElementById,
  getElementByXPath,
} from '@cmsgov/design-system-scripts/helpers/e2e';
import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/e2e/constants';
import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/e2e/assertNoAxeViolations';

const rootURL = `${ROOT_URL}/example/components.help-drawer.react-help-drawer/`;

describe('Help Drawer component', () => {
  it('Should render', async () => {
    await driver.get(rootURL);

    const el = await getElementById('js-example');
    expect(el).toBeTruthy();
  });

  it('Should open the help drawer on click', async () => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="js-example"]/div/button');
    el.click();

    el = await getElementByClassName('ds-c-help-drawer');
    expect(el).toBeTruthy();
  });

  it('Should have no accessibility violations', async () => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="js-example"]/div/button');
    el.click();

    el = await getElementByClassName('ds-c-help-drawer');

    await assertNoAxeViolations();
  });
});
