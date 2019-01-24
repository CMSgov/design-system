import 'chromedriver';
import { DRIVER, ROOT_URL } from '../helpers/constants';
import { getElementById, getElementByXPath } from '../helpers/e2eTestHelpers';

let actual, driver, el, expected;

afterAll(() => {
  driver.quit();
});

describe('CMS Design System smoke test', () => {
  it('Waits for the driver to start', () => {
    return DRIVER.then(_d => {
      driver = _d;
    });
  });

  it('Initialises the context', async() => {
    await driver
      .manage()
      .window()
      .setPosition(0, 0);
    await driver
      .manage()
      .window()
      .setSize(1280, 1024);
    await driver.get(ROOT_URL);
  });

  it('Should click Getting Started and load the /getting-started page', async() => {
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
