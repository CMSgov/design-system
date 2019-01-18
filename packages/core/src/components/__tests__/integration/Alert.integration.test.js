import 'selenium-webdriver/chrome';
import 'chromedriver';
import AxeBuilder from 'axe-webdriverjs';
import { Builder } from 'selenium-webdriver';

const d = new Builder().forBrowser('chrome').build();
const rootURL = 'http://localhost:3000/example/components.alert.react/';
let driver;

afterAll(() => {
  driver.quit();
});

describe('Alert component', () => {
  it('Waits for the driver to start', () => {
    return d.then(_d => {
      driver = _d;
    });
  });

  it('Should have no accessibility violations', async done => {
    await driver.get(rootURL);

    AxeBuilder(driver)
      .withTags(['section508', 'wcag2a', 'wcag2aa'])
      .analyze(results => {
        console.log(results.violations);
        expect(results.violations.length).toBe(0);
        done();
      });
  });
});
