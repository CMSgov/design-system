import 'chromedriver';
import { ROOT_URL, RULESET_ALL } from '../../helpers/e2e/constants';
import WebDriver, { Builder } from 'selenium-webdriver';
import AxeBuilder from 'axe-webdriverjs';
import { getElementByClassName } from '../../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.badge/`;
const infoURL = `${ROOT_URL}/example/components.badge..ds-c-badge--info/`;
const successURL = `${ROOT_URL}/example/components.badge..ds-c-badge--success/`;
const warnURL = `${ROOT_URL}/example/components.badge..ds-c-badge--warn/`;
const alertURL = `${ROOT_URL}/example/components.badge..ds-c-badge--alert/`;
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

describe('Badge component', () => {
  it('Badge should render', async() => {
    await driver.get(rootURL);

    el = await getElementByClassName(driver, 'ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Info badge should render', async() => {
    await driver.get(infoURL);

    el = await getElementByClassName(driver, 'ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Success badge should render', async() => {
    await driver.get(successURL);

    el = await getElementByClassName(driver, 'ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Warning badge should render', async() => {
    await driver.get(warnURL);

    el = await getElementByClassName(driver, 'ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Alert badge should render', async() => {
    await driver.get(alertURL);

    el = await getElementByClassName(driver, 'ds-c-badge');
    expect(el).toBeTruthy();
  });

  it('Badge should have no accessibility violations', async done => {
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

  it('Info badge should have no accessibility violations', async done => {
    await driver.get(infoURL);

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

  it('Success badge should have no accessibility violations', async done => {
    await driver.get(successURL);

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

  it('Warning badge should have no accessibility violations', async done => {
    await driver.get(warnURL);

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

  it('Alert badge should have no accessibility violations', async done => {
    await driver.get(alertURL);

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
