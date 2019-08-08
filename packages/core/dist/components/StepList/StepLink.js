'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepLink = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StepLink = exports.StepLink = function (_React$PureComponent) {
  _inherits(StepLink, _React$PureComponent);

  function StepLink() {
    _classCallCheck(this, StepLink);

    return _possibleConstructorReturn(this, (StepLink.__proto__ || Object.getPrototypeOf(StepLink)).apply(this, arguments));
  }

  _createClass(StepLink, [{
    key: 'handleClick',
    value: function handleClick(event) {
      if (this.props.onClick) {
        event.preventDefault();
        this.props.onClick(this.props.href, this.props.stepId);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          href = _props.href,
          screenReaderText = _props.screenReaderText,
          className = _props.className,
          children = _props.children;

      var onClick = function onClick(event) {
        return _this2.handleClick(event);
      };
      return _react2.default.createElement(
        'a',
        { href: href, onClick: onClick, className: className },
        children,
        screenReaderText && _react2.default.createElement(
          'span',
          { className: 'ds-u-visibility--screen-reader' },
          ' ',
          screenReaderText
        )
      );
    }
  }]);

  return StepLink;
}(_react2.default.PureComponent);

StepLink.propTypes = {
  /**
   * Label text or HTML.
   */
  children: _propTypes2.default.node.isRequired,
  href: _propTypes2.default.string.isRequired,
  stepId: _propTypes2.default.string,
  screenReaderText: _propTypes2.default.string,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

exports.default = StepLink;