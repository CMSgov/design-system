'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFocusInnerText = exports.getElementByXPath = exports.getElementById = exports.getElementByClassName = undefined;

var getElementByClassName = exports.getElementByClassName = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(className) {
    var el;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return driver.wait(until.elementLocated(by.className(className)), _constants.WAIT_UNTIL_TIME);

          case 2:
            el = _context.sent;
            return _context.abrupt('return', driver.wait(until.elementIsVisible(el), _constants.WAIT_UNTIL_TIME));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getElementByClassName(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getElementById = exports.getElementById = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    var el;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return driver.wait(until.elementLocated(by.id(id)), _constants.WAIT_UNTIL_TIME);

          case 2:
            el = _context2.sent;
            return _context2.abrupt('return', driver.wait(until.elementIsVisible(el), _constants.WAIT_UNTIL_TIME));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getElementById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getElementByXPath = exports.getElementByXPath = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(xpath) {
    var el;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return driver.wait(until.elementLocated(by.xpath(xpath)), _constants.WAIT_UNTIL_TIME);

          case 2:
            el = _context3.sent;
            return _context3.abrupt('return', driver.wait(until.elementIsVisible(el), _constants.WAIT_UNTIL_TIME));

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getElementByXPath(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getFocusInnerText = exports.getFocusInnerText = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var el;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return driver.switchTo().activeElement().getAttribute('innerText');

          case 2:
            el = _context4.sent;
            return _context4.abrupt('return', el);

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getFocusInnerText() {
    return _ref4.apply(this, arguments);
  };
}();

var _constants = require('./constants');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global driver, by, until */