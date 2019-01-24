'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WAIT_UNTIL_TIME = exports.RULESET_508 = exports.RULESET_WCAG_TWO = exports.RULESET_BEST_PRACTICE = exports.RULESET_ALL = exports.ROOT_URL = exports.DRIVER = undefined;

var _seleniumWebdriver = require('selenium-webdriver');

var _chrome = require('selenium-webdriver/chrome');

var _chrome2 = _interopRequireDefault(_chrome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DRIVER = exports.DRIVER = new _seleniumWebdriver.Builder().forBrowser('chrome').setChromeOptions(new _chrome2.default.Options().headless()).build();
var ROOT_URL = exports.ROOT_URL = 'http://localhost:3000';
var RULESET_ALL = exports.RULESET_ALL = ['section508', 'wcag2a', 'wcag2aa', 'wcag21aa'];
var RULESET_BEST_PRACTICE = exports.RULESET_BEST_PRACTICE = ['best-practice'];
var RULESET_WCAG_TWO = exports.RULESET_WCAG_TWO = ['section508', 'wcag2a', 'wcag2aa'];
var RULESET_508 = exports.RULESET_508 = ['section508'];
var WAIT_UNTIL_TIME = exports.WAIT_UNTIL_TIME = 30000;