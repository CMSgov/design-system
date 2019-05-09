/* global driver, key */
import { getElementByClassName, getElementByXPath } from '../../helpers/e2e';
import { ROOT_URL } from '../../helpers/e2e/constants';

import assertNoAxeViolations from '../../helpers/e2e/assertNoAxeViolations';

const rootURL = `${ROOT_URL}/example/components.autocomplete.react/`;

describe('Autocomplete component', () => {
  it('Should render', async() => {
    await driver.get(rootURL);

    const el = await getElementByClassName('ds-u-clearfix ds-c-autocomplete');
    expect(el).toBeTruthy();
  });

  it('Should expand the listbox when keys are pressed', async() => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="autocomplete_1"]');
    el.click();
    await el.sendKeys('c');

    el = await getElementByXPath('//*[@id="autocomplete_owned_container_4"]');
    expect(el).toBeTruthy();
  });

  it('Should set the input value correctly when a listbox selection is clicked', async() => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="autocomplete_1"]');
    el.click();
    await el.sendKeys('c');

    el = await getElementByXPath('//*[@id="downshift-0-item-0"]');
    el.click();

    el = await getElementByXPath('//*[@id="autocomplete_1"]');
    el = await el.getAttribute('value');
    expect(el).toEqual('Cook County, IL');
  });

  it('Should set the input value to empty when Clear search is clicked', async() => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="autocomplete_1"]');
    el.click();
    await el.sendKeys('c');

    el = await getElementByXPath('//*[@id="downshift-0-item-0"]');
    el.click();

    el = await getElementByXPath('//*[@id="js-example"]/div/div[1]/button');
    el.click();

    el = await getElementByXPath('//*[@id="autocomplete_1"]');
    el = await el.getAttribute('value');
    expect(el).toEqual('');
  });

  it('Should select list items by keyboard', async() => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="autocomplete_1"]');
    el.click();
    await el.sendKeys('c');
    await el.sendKeys(key.ARROW_DOWN);
    await el.sendKeys(key.ENTER);

    el = await el.getAttribute('value');
    expect(el).toEqual('Cook County, IL');
  });

  it('Should clear the input value by keyboard', async() => {
    await driver.get(rootURL);

    let el = await getElementByXPath('//*[@id="autocomplete_1"]');
    el.click();
    await el.sendKeys('c');
    await el.sendKeys(key.ARROW_DOWN);
    await el.sendKeys(key.ENTER);
    await el.sendKeys(key.TAB);

    el = await getElementByXPath('//*[@id="js-example"]/div/div[1]/button');
    el.click();

    el = await getElementByXPath('//*[@id="autocomplete_1"]');
    el = await el.getAttribute('value');
    expect(el).toEqual('');
  });

  it('Closes the listbox when ESC is pressed', async() => {
    await driver.get(rootURL);

    let container = await getElementByXPath(
      '//*[@id="js-example"]/div/div[1]/div'
    );
    container = await container.getAttribute('outerHTML');

    let el = await getElementByXPath('//*[@id="autocomplete_1"]');
    el.click();
    await el.sendKeys('c');
    await el.sendKeys(key.ESCAPE);

    el = await getElementByXPath('//*[@id="js-example"]/div/div[1]/div');
    el = await el.getAttribute('outerHTML');

    expect(el).toEqual(container);
  });

  it('Should have no accessibility violations', async() => {
    await assertNoAxeViolations(rootURL);
  });
});
