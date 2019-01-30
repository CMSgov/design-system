import 'chromedriver';
import { ROOT_URL, RULESET_ALL } from '../helpers/constants';
import WebDriver, { Builder } from 'selenium-webdriver';
import AxeBuilder from 'axe-webdriverjs';
import { getElementByClassName } from '../helpers/e2eTestHelpers';

const rootURL = `${ROOT_URL}/example/components.month-picker.react/`;
let driver, el;

beforeEach(() => {
  const chromeCapabilities = WebDriver.Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', {
    args: ['--headless', '--window-size=1024,768']
  });

  driver = new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();
});

afterEach(() => {
  driver.quit();
});

describe('Month Picker component', () => {
  it('Should render', async() => {
    await driver.get(rootURL);

    el = await getElementByClassName(driver, 'ds-c-month-picker');
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
