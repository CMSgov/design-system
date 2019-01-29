import 'chromedriver';
import WebDriver, { Builder } from 'selenium-webdriver';
import { getElementById, getElementByXPath } from '../helpers/e2eTestHelpers';
import { ROOT_URL } from '../helpers/constants';

let actual, driver, el, expected;

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

describe('CMS Design System smoke test', () => {
  it('Initialises the context', async() => {
    await driver.get(ROOT_URL);
    await driver
      .manage()
      .window()
      .setPosition(0, 0);
    await driver
      .manage()
      .window()
      .setSize(1280, 1024);
  });

  it('Should click Getting Started and load the /getting-started page', async() => {
    await driver.get(ROOT_URL);

    el = await getElementByXPath(
      driver,
      '//*[@id="js-root"]/div/div/nav/ul/li[2]/a'
    );
    el.click();
    el = await getElementById(driver, 'getting-started');

    actual = await el.getText();
    expected = 'Getting started';
    expect(actual).toEqual(expected);
  });
});
