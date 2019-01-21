import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export const DRIVER = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options().headless())
  .build();
export const ROOT_URL = 'http://localhost:3000/';
export const WAIT_UNTIL_TIME = 30000;
