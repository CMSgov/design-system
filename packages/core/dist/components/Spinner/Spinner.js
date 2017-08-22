'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = exports.Spinner = function Spinner(props) {
  return _react2.default.createElement(
    'span',
    { className: 'ds-c-badge' },
    props.children
  );
};

Spinner.propTypes = {};

exports.default = Spinner;