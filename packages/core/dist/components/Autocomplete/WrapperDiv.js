'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable */


// See https://github.com/downshift-js/downshift#getrootprops
// Custom container returns a plain div, without the ARIA markup
// required for a WAI-ARIA 1.1 combobox. See the comments at the
// top of the component file for an explanation of this decision.
var WrapperDiv = function WrapperDiv(_ref) {
  var innerRef = _ref.innerRef,
      rest = _objectWithoutProperties(_ref, ['innerRef']);

  return _react2.default.createElement('div', _extends({ ref: innerRef }, rest));
};

exports.default = WrapperDiv;