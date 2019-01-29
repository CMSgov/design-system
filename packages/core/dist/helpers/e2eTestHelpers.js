'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementByXPath = exports.getElementById = exports.getElementByClassName = undefined;

var getElementByClassName = exports.getElementByClassName = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(driver, className) {
    var el;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.className(className)), _constants.WAIT_UNTIL_TIME);

          case 2:
            el = _context.sent;
            return _context.abrupt('return', driver.wait(_seleniumWebdriver.until.elementIsVisible(el), _constants.WAIT_UNTIL_TIME));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getElementByClassName(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getElementById = exports.getElementById = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver, id) {
    var el;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.id(id)), _constants.WAIT_UNTIL_TIME);

          case 2:
            el = _context2.sent;
            return _context2.abrupt('return', driver.wait(_seleniumWebdriver.until.elementIsVisible(el), _constants.WAIT_UNTIL_TIME));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getElementById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getElementByXPath = exports.getElementByXPath = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver, xpath) {
    var el;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.xpath(xpath)), _constants.WAIT_UNTIL_TIME);

          case 2:
            el = _context3.sent;
            return _context3.abrupt('return', driver.wait(_seleniumWebdriver.until.elementIsVisible(el), _constants.WAIT_UNTIL_TIME));

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getElementByXPath(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _seleniumWebdriver = require('selenium-webdriver');

var _constants = require('./constants');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }