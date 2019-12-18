/* global driver */
import { getElementById, getElementByXPath } from '../helpers/e2e';
import { ROOT_URL } from '../helpers/e2e/constants';

describe('CMS Design System smoke test', () => {
  it('Sets window size and scroll position', async() => {
    await driver.get(ROOT_URL);
    await driver
      .manage()
      .window()
      .setRect(1024, 768, 0, 0);
  });

  it('Should click Learn how to get started and open startup/Installation/', async() => {
    await driver.get(ROOT_URL);

    let el = await getElementByXPath('//*[@id="main"]/div/div/article/div/p[3]/a[2]');
    el.click();
    el = await getElementById('startup.installation');

    const actual = await el.getText();
    const expected = 'Install with NPM';
    expect(actual).toEqual(expected);
  });
});
