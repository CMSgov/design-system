'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipNav = SkipNav;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SkipNav(props) {
  return _react2.default.createElement(
    'a',
    { className: 'ds-c-skip-nav', href: props.href },
    props.children
  );
}

SkipNav.defaultProps = {
  children: 'Skip to main content'
};

SkipNav.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * The anchor or target for the link (where the link will jump the user to)
   */
  href: _propTypes2.default.string.isRequired
};

exports.default = SkipNav;