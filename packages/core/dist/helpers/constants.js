'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WCAG_RULES = exports.WAIT_UNTIL_TIME = exports.ROOT_URL = exports.DRIVER = undefined;

var _seleniumWebdriver = require('selenium-webdriver');

var _chrome = require('selenium-webdriver/chrome');

var _chrome2 = _interopRequireDefault(_chrome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DRIVER = exports.DRIVER = new _seleniumWebdriver.Builder().forBrowser('chrome').setChromeOptions(new _chrome2.default.Options().headless()).build();
var ROOT_URL = exports.ROOT_URL = 'http://localhost:3000/';
var WAIT_UNTIL_TIME = exports.WAIT_UNTIL_TIME = 30000;
var WCAG_RULES = exports.WCAG_RULES = ['section508', 'wcag2a', 'wcag2aa', 'wcag21aa'];