'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Alert = exports.Alert = function (_React$PureComponent) {
  _inherits(Alert, _React$PureComponent);

  function Alert() {
    _classCallCheck(this, Alert);

    return _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));
  }

  _createClass(Alert, [{
    key: 'heading',
    value: function heading() {
      if (this.props.heading) {
        return _react2.default.createElement(
          'h3',
          { className: 'ds-c-alert__heading' },
          this.props.heading
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)('ds-c-alert', this.props.hideIcon && 'ds-c-alert--hide-icon', this.props.variation && 'ds-c-alert--' + this.props.variation, this.props.className);

      return _react2.default.createElement(
        'div',
        { className: classes, role: this.props.role },
        _react2.default.createElement(
          'div',
          { className: 'ds-c-alert__body' },
          this.heading(),
          this.props.children
        )
      );
    }
  }]);

  return Alert;
}(_react2.default.PureComponent);

Alert.propTypes = {
  children: _propTypes2.default.node.isRequired,
  heading: _propTypes2.default.string,
  hideIcon: _propTypes2.default.bool,
  /** ARIA `role` */
  role: _propTypes2.default.oneOf(['alert', 'alertdialog']),
  variation: _propTypes2.default.oneOf(['error', 'warn', 'success'])
};

exports.default = Alert;