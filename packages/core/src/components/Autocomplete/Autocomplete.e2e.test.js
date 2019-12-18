/* global driver, by, key */
import { getElementByClassName, getElementByXPath, getFocusInnerText } from '../../helpers/e2e';
import { ROOT_URL } from '../../helpers/e2e/constants';

import assertNoAxeViolations from '../../helpers/e2e/assertNoAxeViolations';

const rootURL = `${ROOT_URL}/example/components.autocomplete.react/`;

describe('Autocomplete component', () => {
  it('Should render', async() => {
    await driver.get(rootURL);

    const autocompleteField = await getElementByClassName('ds-u-clearfix ds-c-autocomplete');
    expect(autocompleteField).toBeTruthy();
  });

  it('Should expand the listbox when keys are pressed', async() => {
    await driver.get(rootURL);

    const autocompleteField = await getElementByXPath('//*[@id="autocomplete_1"]');
    autocompleteField.click();
    await autocompleteField.sendKeys('c');

    const listbox = await getElementByXPath('//*[@id="autocomplete_owned_container_4"]');
    expect(listbox).toBeTruthy();
  });

  it('Should set the input value correctly when a listbox selection is clicked', async() => {
    await driver.get(rootURL);

    let autocompleteField = await getElementByXPath('//*[@id="autocomplete_1"]');
    autocompleteField.click();
    await autocompleteField.sendKeys('c');

    const listboxItem = await getElementByXPath('//*[@id="downshift-0-item-0"]');
    listboxItem.click();

    autocompleteField = await getElementByXPath('//*[@id="autocomplete_1"]');
    autocompleteField = await autocompleteField.getAttribute('value');
    expect(autocompleteField).toEqual('Cook County, IL');
  });

  it('Should set the input value to empty when Clear search is clicked', async() => {
    await driver.get(rootURL);

    let autocompleteField = await getElementByXPath('//*[@id="autocomplete_1"]');
    autocompleteField.click();
    await autocompleteField.sendKeys('c');

    const listboxItem = await getElementByXPath('//*[@id="downshift-0-item-0"]');
    listboxItem.click();

    const clearButton = await getElementByXPath('//*[@id="js-example"]/div/div[1]/button');
    clearButton.click();

    autocompleteField = await getElementByXPath('//*[@id="autocomplete_1"]');
    autocompleteField = await autocompleteField.getAttribute('value');
    expect(autocompleteField).toEqual('');
  });

  it('Should select list items by keyboard', async() => {
    await driver.get(rootURL);

    let autocompleteField = await getElementByXPath('//*[@id="autocomplete_1"]');
    autocompleteField.click();
    await autocompleteField.sendKeys('c');
    await autocompleteField.sendKeys(key.ARROW_DOWN);
    await autocompleteField.sendKeys(key.ENTER);

    autocompleteField = await autocompleteField.getAttribute('value');
    expect(autocompleteField).toEqual('Cook County, IL');
  });

  it('Should clear the input value by keyboard', async() => {
    await driver.get(rootURL);

    let autocompleteField = await getElementByXPath('//*[@id="autocomplete_1"]');
    const clearSearch = await getElementByXPath('//*[@id="js-example"]/div/div[1]/button');

    autocompleteField.click();
    await autocompleteField.sendKeys('c');
    await autocompleteField.sendKeys(key.ARROW_DOWN);
    await autocompleteField.sendKeys(key.ENTER);
    await autocompleteField.sendKeys(key.TAB);

    /* Assert the clear search button has keyboard focus, then click it.
     * We are using the Selenium driver object to determine keyboard
     * focus after sending the TAB key.
     */
    expect(await getFocusInnerText()).toEqual('Clear search');

    clearSearch.click();

    autocompleteField = await getElementByXPath('//*[@id="autocomplete_1"]');
    autocompleteField = await autocompleteField.getAttribute('value');
    expect(autocompleteField).toEqual('');
  });

  it('Closes the listbox when ESC is pressed', async() => {
    await driver.get(rootURL);

    const autocompleteField = await getElementByXPath('//*[@id="autocomplete_1"]');
    autocompleteField.click();
    await autocompleteField.sendKeys('c');
    let listbox = await driver.findElements(by.css('#autocomplete_owned_container_4'));
    expect(listbox.length).toEqual(1);

    await autocompleteField.sendKeys(key.ESCAPE);
    listbox = await driver.findElements(by.css('#autocomplete_owned_container_4'));
    expect(listbox.length).toEqual(0);
  });

  it('Should have no accessibility violations', async() => {
    await assertNoAxeViolations(rootURL);
  });
});
