'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = exports.Spinner = function Spinner(props) {
  var className = (0, _classnames2.default)('ds-c-spinner', props.size && 'ds-c-spinner--' + props.size, props.inversed && 'ds-u-fill--background-inverse ds-u-color--base-inverse', props.filled && 'ds-c-spinner--filled', props.className);

  return _react2.default.createElement('span', { className: className });
};

Spinner.propTypes = {
  /**
   * Additional classes to be added to the spinner element.
   * Useful for adding utility classes.
   */
  className: _propTypes2.default.string,
  /** Applies the inverse theme styling */
  inversed: _propTypes2.default.bool,
  /** Adds a background behind the spinner for extra contrast */
  filled: _propTypes2.default.bool,
  /** Smaller or larger variant */
  size: _propTypes2.default.oneOf(['small', 'big'])
};

exports.default = Spinner;