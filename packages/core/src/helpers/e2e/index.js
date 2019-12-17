/* global driver, by, until */
import { WAIT_UNTIL_TIME } from './constants';

export async function getElementByClassName(className) {
  const el = await driver.wait(until.elementLocated(by.className(className)), WAIT_UNTIL_TIME);
  return driver.wait(until.elementIsVisible(el), WAIT_UNTIL_TIME);
}

export async function getElementById(id) {
  const el = await driver.wait(until.elementLocated(by.id(id)), WAIT_UNTIL_TIME);
  return driver.wait(until.elementIsVisible(el), WAIT_UNTIL_TIME);
}

export async function getElementByXPath(xpath) {
  const el = await driver.wait(until.elementLocated(by.xpath(xpath)), WAIT_UNTIL_TIME);
  return driver.wait(until.elementIsVisible(el), WAIT_UNTIL_TIME);
}

export async function getFocusInnerText() {
  const el = await driver
    .switchTo()
    .activeElement()
    .getAttribute('innerText');
  return el;
}
