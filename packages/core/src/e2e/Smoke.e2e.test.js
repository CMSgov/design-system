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
  it('Sets window size and scroll position', async() => {
    await driver.get(ROOT_URL);
    await driver
      .manage()
      .window()
      .setRect(1024, 768, 0, 0);
  });

  it('Should click Learn how to get started and open startup/installation/', async() => {
    await driver.get(ROOT_URL);

    el = await getElementByXPath(
      driver,
      '//*[@id="main"]/div/div/article/div/p[3]/a'
    );
    el.click();
    el = await getElementById(driver, 'startup.installation');

    actual = await el.getText();
    expected = 'Installation';
    expect(actual).toEqual(expected);
  });
});
