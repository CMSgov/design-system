/* global driver */
import { getElementByClassName, getElementByXPath } from '../../helpers/e2e';
import { ROOT_URL } from '../../helpers/e2e/constants';

import assertNoAxeViolations from '../../helpers/e2e/assertNoAxeViolations';

const rootURL = `${ROOT_URL}/example/components.autocomplete.react/`;

describe('Alert component', () => {
  it('Should render', async() => {
    await driver.get(rootURL);

    const el = await getElementByClassName('ds-u-clearfix ds-c-autocomplete');
    expect(el).toBeTruthy();
  });

  it('Should expand listbox on input value', async() => {
    await driver.get(rootURL);

    const input = await getElementByXPath('//*[@id="autocomplete_1"]');

    driver.findElement(input).sendKeys('c');

    const listbox = await getElementByXPath(
      '//*[@id="autocomplete_owned_container_4"]'
    );
    expect(listbox).toBeTruthy();
  });

  it('Should have no accessibility violations', async() => {
    await assertNoAxeViolations(rootURL);
  });
});
