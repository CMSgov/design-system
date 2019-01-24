import 'chromedriver';
import { ROOT_URL, RULESET_ALL } from '../helpers/constants';
import AxeBuilder from 'axe-webdriverjs';
import { _driver } from '../helpers/e2eTestHelpers';

const rootURL = `${ROOT_URL}/example/components.alert.react/`;
let driver;

afterAll(() => {
  driver.quit();
});

describe('Alert component', () => {
  it('Waits for the driver to start', () => {
    return _driver.then(_d => {
      driver = _d;
    });
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
