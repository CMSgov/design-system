'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Badge = exports.Badge = function Badge(props) {
  return _react2.default.createElement(
    'span',
    { className: 'ds-c-badge' },
    props.children
  );
};

Badge.propTypes = {
  /**
   * In most cases this will be the badge's label, but you could also use this
   * to nest more advanced JSX.
  */
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]).isRequired
};

exports.default = Badge;