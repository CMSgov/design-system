'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axeWebdriverjs = require('axe-webdriverjs');

var _axeWebdriverjs2 = _interopRequireDefault(_axeWebdriverjs);

var _constants = require('../../helpers/e2e/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global driver */


exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!url) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return driver.get(url);

          case 3:
            _context.next = 5;
            return (0, _axeWebdriverjs2.default)(driver).withTags(_constants.RULESET_ALL).disableRules('bypass').analyze(function (err, results) {
              if (err) {
                console.error(err);
              }
              if (results.violations.length >= 1) {
                console.log(results.violations);
              }
              expect(results.violations.length).toBe(0);
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function assertNoAxeViolations(_x) {
    return _ref.apply(this, arguments);
  }

  return assertNoAxeViolations;
}();