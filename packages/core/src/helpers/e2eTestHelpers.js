import { Builder, By, until } from 'selenium-webdriver';
import { WAIT_UNTIL_TIME } from './constants';
import chrome from 'selenium-webdriver/chrome';

export const _driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options().headless())
  .build();

export async function getElementById(driver, id) {
  const el = await driver.wait(
    until.elementLocated(By.id(id)),
    WAIT_UNTIL_TIME
  );
  return driver.wait(until.elementIsVisible(el), WAIT_UNTIL_TIME);
}

export async function getElementByXPath(driver, xpath) {
  const el = await driver.wait(
    until.elementLocated(By.xpath(xpath)),
    WAIT_UNTIL_TIME
  );
  return driver.wait(until.elementIsVisible(el), WAIT_UNTIL_TIME);
}
