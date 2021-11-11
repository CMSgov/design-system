/* global driver */
import {
  getElementByClassName,
  getElementByXPath,
} from '@cmsgov/design-system-scripts/helpers/a11y';
import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/a11y/constants';
import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/a11y/assertNoAxeViolations';

const rootURL = `${ROOT_URL}/example/components.drawer.react-drawer/`;

describe('Drawer component', () => {
  it('Should have no accessibility violations', async () => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="js-example"]/div/button');
    el.click();

    el = await getElementByClassName('ds-c-drawer');

    await assertNoAxeViolations();
  });
});
