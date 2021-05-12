/* global driver, by, until */
const { WAIT_UNTIL_TIME } = require('./constants');

async function getElementByClassName(className) {
  const el = await driver.wait(until.elementLocated(by.className(className)), WAIT_UNTIL_TIME);
  return driver.wait(until.elementIsVisible(el), WAIT_UNTIL_TIME);
}

async function getElementById(id) {
  const el = await driver.wait(until.elementLocated(by.id(id)), WAIT_UNTIL_TIME);
  return driver.wait(until.elementIsVisible(el), WAIT_UNTIL_TIME);
}

async function getElementByXPath(xpath) {
  const el = await driver.wait(until.elementLocated(by.xpath(xpath)), WAIT_UNTIL_TIME);
  return driver.wait(until.elementIsVisible(el), WAIT_UNTIL_TIME);
}

async function getFocusInnerText() {
  const el = await driver.switchTo().activeElement().getAttribute('innerText');
  return el;
}

module.exports = {
  getElementByClassName,
  getElementById,
  getElementByXPath,
  getFocusInnerText,
};
