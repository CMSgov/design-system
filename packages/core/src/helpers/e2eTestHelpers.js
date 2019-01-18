import { By, until } from 'selenium-webdriver';
import { WAIT_UNTIL_TIME } from './constants';

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
