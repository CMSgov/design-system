/* eslint-disable  filenames/match-exported */
const NodeEnvironment = require('jest-environment-node');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    const options = config.testEnvironmentOptions || {};
    this.chromeOptions = options.chromeOptions;
    this.browserName = options.browser || 'chrome';
  }

  async buildDriver() {
    let driver = new Builder().forBrowser(this.browserName);

    if (this.chromeOptions) {
      const chromeCapabilities = Capabilities.chrome();
      chromeCapabilities.set('chromeOptions', this.chromeOptions);
      driver = driver.withCapabilities(chromeCapabilities);
    }

    return driver.build();
  }

  async setup() {
    await super.setup();
    this.driver = await this.buildDriver();
    this.global.driver = this.driver;
    this.global.by = By;
    this.global.element = locator => this.driver.findElement(locator);
    this.global.element.all = locator => this.driver.findElements(locator);
    this.global.key = Key;
    this.global.until = until;
  }

  async teardown() {
    await this.driver.quit();
    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;
