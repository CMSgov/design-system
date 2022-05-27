import 'regenerator-runtime/runtime';
const AxeBuilder = require('@axe-core/webdriverjs');
const NodeEnvironment = require('jest-environment-node');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    const options = config.testEnvironmentOptions || {};
    this.chromeOptions = options.chromeOptions;
    this.browserName = options.browser || 'chrome';
  }

  async buildDriver() {
    const driver = new Builder().forBrowser(this.browserName);

    if (this.chromeOptions) {
      const chromeOptions = new chrome.Options();
      chromeOptions.addArguments(this.chromeOptions);
      driver.setChromeOptions(chromeOptions);
    }

    return driver.build();
  }

  async setup() {
    await super.setup();
    this.driver = await this.buildDriver();
    this.global.driver = this.driver;
    this.global.by = By;
    this.global.element = (locator) => this.driver.findElement(locator);
    this.global.element.all = (locator) => this.driver.findElements(locator);
    this.global.key = Key;
    this.global.until = until;
    this.global.AxeBuilder = AxeBuilder;
  }

  async teardown() {
    if (this.driver) {
      await this.driver.quit();
    }
    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;
