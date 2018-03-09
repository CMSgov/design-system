'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mask = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Mask component renders a controlled input field. When the
 * field is blurred, it applies formatting to improve the readability
 * of the value.
 */
var Mask = exports.Mask = function (_React$PureComponent) {
  _inherits(Mask, _React$PureComponent);

  function Mask(props) {
    _classCallCheck(this, Mask);

    var _this = _possibleConstructorReturn(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).call(this, props));

    _this.field = _react2.default.Children.only(_this.props.children);
    _this.state = {
      value: _this.maskedValue(_this.initialValue())
    };
    return _this;
  }

  _createClass(Mask, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.debouncedOnBlurEvent) {
        this.field.props.onBlur(this.debouncedOnBlurEvent);
        this.debouncedOnBlurEvent = null;
      }
    }

    /**
     * @param {String} value
     * @returns {Number}
     */

  }, {
    key: 'toNumber',
    value: function toNumber(value) {
      if (typeof value !== 'string') return value;

      // 0 = number, 1 = decimals
      var parts = value.split('.');
      var digitsRegex = /^-|\d/g; // include a check for a beginning "-" for negative numbers
      var a = parts[0].match(digitsRegex).join('');
      var b = parts.length >= 2 && parts[1].match(digitsRegex).join('');

      return b ? parseFloat(a + '.' + b) : parseInt(a);
    }

    /**
     * Format a string using fixed-point notation, similar to Number.prototype.toFixed
     * though a decimal is only fixed if the string included a decimal already
     * @param {String} value - A stringified number (i.e. "1234")
     * @param {Number} digits - The number of digits to appear after the decimal point
     * @returns {String}
     */

  }, {
    key: 'stringWithFixedDigits',
    value: function stringWithFixedDigits(value) {
      var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

      var decimalRegex = /\.[\d]+$/;

      // Check for existing decimal
      var decimal = value.match(decimalRegex);

      if (decimal) {
        var fixedDecimal = parseFloat(decimal).toFixed(digits).match(decimalRegex)[0];

        return value.replace(decimal, fixedDecimal);
      }

      return value;
    }

    /**
     * Returns the value with additional masking characters
     * @param {String} value
     * @returns {String}
     */

  }, {
    key: 'maskedValue',
    value: function maskedValue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (value && typeof value === 'string') {
        value = value.trim();

        if (this.props.mask === 'currency') {
          // Format number with commas. If the number includes a decimal,
          // ensure it includes two decimal points
          value = this.toNumber(value);
          value = this.stringWithFixedDigits(value.toLocaleString('en-US'));
        }
      }

      return value;
    }

    /**
     * To avoid a jarring experience for screen readers, we only
     * add/remove characters after the field has been blurred,
     * rather than when the user is typing in the field
     * @param {Object} evt
     */

  }, {
    key: 'handleBlur',
    value: function handleBlur(evt) {
      var value = this.maskedValue(evt.target.value);

      // We only debounce the onBlur when we know for sure that
      // this component will re-render (AKA when the value changes)
      // and when an onBlur callback is present
      var debounce = value !== this.state.value && typeof this.field.props.onBlur === 'function';

      if (debounce) {
        // We need to retain a reference to the event after the callback
        // has been called. We pass this onto the consuming app's onBlur
        // only after the value has been manipulated – this way, the
        // value returned by event.target.value is the value after masking
        evt.persist();
        this.debouncedOnBlurEvent = evt;
      }

      this.setState({
        value: value
      });

      if (!debounce && typeof this.field.props.onBlur === 'function') {
        // If we didn't debounce the onBlur event, then we need to
        // call the onBlur callback from here
        this.field.props.onBlur(evt);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(evt) {
      this.setState({ value: evt.target.value });

      if (typeof this.field.props.onChange === 'function') {
        this.field.props.onChange(evt);
      }
    }
  }, {
    key: 'initialValue',
    value: function initialValue() {
      return this.field.props.value || this.field.props.defaultValue;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.cloneElement(this.field, {
        defaultValue: undefined,
        onBlur: function onBlur(evt) {
          return _this2.handleBlur(evt);
        },
        onChange: function onChange(evt) {
          return _this2.handleChange(evt);
        },
        value: this.state.value
      });
    }
  }]);

  return Mask;
}(_react2.default.PureComponent);

Mask.propTypes = {
  /** Pass the input as the child */
  children: _propTypes2.default.node.isRequired,
  mask: _propTypes2.default.string.isRequired
};

exports.default = Mask;