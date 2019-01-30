import 'chromedriver';
import { ROOT_URL, RULESET_ALL } from '../helpers/constants';
import WebDriver, { Builder } from 'selenium-webdriver';
import AxeBuilder from 'axe-webdriverjs';
import { getElementByClassName } from '../helpers/e2eTestHelpers';

const rootURL = `${ROOT_URL}/example/components.button/`;
const primaryURL = `${ROOT_URL}/example/components.button..ds-c-button--primary/`;
const transparentURL = `${ROOT_URL}/example/components.button..ds-c-button--transparent/`;
const dangerURL = `${ROOT_URL}/example/components.button..ds-c-button--danger/`;
const successURL = `${ROOT_URL}/example/components.button..ds-c-button--success/`;
const disabledURL = `${ROOT_URL}/example/components.button.disabled/`;
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

describe('Button component', () => {
  it('Button should render', async() => {
    await driver.get(rootURL);

    el = await getElementByClassName(driver, 'ds-c-button');
    expect(el).toBeTruthy();
  });

  it('Button should have no accessibility violations', async done => {
    await driver.get(rootURL);

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

  it('Primary button should have no accessibility violations', async done => {
    await driver.get(primaryURL);

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

  it('Transparent button should have no accessibility violations', async done => {
    await driver.get(transparentURL);

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

  it('Danger button should have no accessibility violations', async done => {
    await driver.get(dangerURL);

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

  it('Success button should have no accessibility violations', async done => {
    await driver.get(successURL);

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

  it('Disabled button should have no accessibility violations', async done => {
    await driver.get(disabledURL);

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
