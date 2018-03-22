/* eslint-disable filenames/match-exported */
const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');

let options = { args: ['--no-sandbox'] };
if (process.env.SLOW_MO) {
  options = Object.assign({}, options, {
    slowMo: parseInt(process.env.SLOW_MO, 10),
    headless: false
  });
}

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    this.global.browser = await puppeteer.launch(options);
  }

  async teardown() {
    await this.global.browser.close();
    await super.teardown();
  }
}

module.exports = PuppeteerEnvironment;
