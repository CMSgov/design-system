import 'chromedriver';
import { DRIVER, ROOT_URL } from '../../../helpers/constants';
import AxeBuilder from 'axe-webdriverjs';

const rootURL = `${ROOT_URL}example/components.alert.react/`;
let driver;

afterAll(() => {
  driver.quit();
});

describe('Alert component', () => {
  it('Waits for the driver to start', () => {
    return DRIVER.then(_d => {
      driver = _d;
    });
  });

  it('Should have no accessibility violations', async done => {
    await driver.get(rootURL);

    AxeBuilder(driver)
      .withTags(['section508', 'wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze(results => {
        console.log(results.violations);
        expect(results.violations.length).toBe(0);
        done();
      });
  });
});
