'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mask = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.unmask = unmask;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Masked field
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               A masked field is an enhanced input field that provides visual and non-visual
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               cues to a user about the expected value.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Style guide: components.masked-field
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


// Deliminate chunks of integers
var deliminatedMaskRegex = {
  phone: /(\d{3})(\d{1,3})?(\d+)?/,
  ssn: /(\d{3})(\d{1,2})?(\d+)?/,
  zip: /(\d{5})(\d+)/
};

/**
 * Split value into groups and insert a hyphen deliminator between each
 * @param {String} value
 * @param {RegExp} rx - Regular expression with capturing groups
 * @returns {String}
 */
function deliminateRegexGroups(value, rx) {
  var matches = toInt(value).match(rx);

  if (matches && matches.length > 1) {
    value = matches.slice(1).filter(function (a) {
      return !!a;
    }) // remove undefined groups
    .join('-');
  }

  return value;
}

/**
 * Format a string using fixed-point notation, similar to Number.prototype.toFixed
 * though a decimal is only fixed if the string included a decimal already
 * @param {String} value - A stringified number (i.e. "1234")
 * @param {Number} digits - The number of digits to appear after the decimal point
 * @returns {String}
 */
function stringWithFixedDigits(value) {
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
 * Remove all non-digits
 * @param {String} value
 * @returns {String}
 */
function toInt(value) {
  return value.replace(/\D+/g, '');
}

/**
 * Convert string into a number (positive or negative float or integer)
 * @param {String} value
 * @returns {Number}
 */
function toNumber(value) {
  if (typeof value !== 'string') return value;

  // 0 = number, 1 = decimals
  var parts = value.split('.');
  var digitsRegex = /^-|\d/g; // include a check for a beginning "-" for negative numbers
  var a = parts[0].match(digitsRegex).join('');
  var b = parts.length >= 2 && parts[1].match(digitsRegex).join('');

  return b ? parseFloat(a + '.' + b) : parseInt(a);
}

/*
`<TextField mask={...}>`

Passing a `mask` prop into the `TextField` component with a valid value will
enable formatting to occur when the field is blurred. To "unmask" the
value, you can import and call the `unmaskValue` method.

@react-component TextField

@react-example Mask

Style guide: components.masked-field.react
*/

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

    _this.state = {
      value: _this.maskedValue(_this.initialValue())
    };
    return _this;
  }

  _createClass(Mask, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.debouncedOnBlurEvent) {
        this.field().props.onBlur(this.debouncedOnBlurEvent);
        this.debouncedOnBlurEvent = null;
      }
    }

    /**
     * Get the child text field. Called as a method so that
     * updates to the field cause the mask to re-render
     * @returns {React.ReactElement} Child TextField
     */

  }, {
    key: 'field',
    value: function field() {
      return _react2.default.Children.only(this.props.children);
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
        var mask = this.props.mask;

        value = value.trim();

        if (mask === 'currency') {
          // Format number with commas. If the number includes a decimal,
          // ensure it includes two decimal points
          value = stringWithFixedDigits(toNumber(value).toLocaleString('en-US'));
        } else if (Object.keys(deliminatedMaskRegex).includes(mask)) {
          value = deliminateRegexGroups(value, deliminatedMaskRegex[mask]);
        }
      }

      return value;
    }

    /**
     * To avoid a jarring experience for screen readers, we only
     * add/remove characters after the field has been blurred,
     * rather than when the user is typing in the field
     * @param {Object} evt
     * @param {React.Element} field - Child TextField
     */

  }, {
    key: 'handleBlur',
    value: function handleBlur(evt, field) {
      var value = this.maskedValue(evt.target.value);

      // We only debounce the onBlur when we know for sure that
      // this component will re-render (AKA when the value changes)
      // and when an onBlur callback is present
      var debounce = value !== this.state.value && typeof field.props.onBlur === 'function';

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

      if (!debounce && typeof field.props.onBlur === 'function') {
        // If we didn't debounce the onBlur event, then we need to
        // call the onBlur callback from here
        field.props.onBlur(evt);
      }
    }

    /**
     * @param {Object} evt
     * @param {React.Element} field - Child TextField
     */

  }, {
    key: 'handleChange',
    value: function handleChange(evt, field) {
      this.setState({ value: evt.target.value });

      if (typeof field.props.onChange === 'function') {
        field.props.onChange(evt);
      }
    }
  }, {
    key: 'initialValue',
    value: function initialValue() {
      var field = this.field();
      return field.props.value || field.props.defaultValue;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var field = this.field();

      return _react2.default.cloneElement(field, {
        defaultValue: undefined,
        onBlur: function onBlur(evt) {
          return _this2.handleBlur(evt, field);
        },
        onChange: function onChange(evt) {
          return _this2.handleChange(evt, field);
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

/**
 * Remove mask characters from value
 * @param {String} value
 * @param {String} mask
 * @returns {String}
 */
function unmask(value, mask) {
  if (!value || typeof value !== 'string') return value;
  var rawValue = value;
  value = value.trim();

  if (mask === 'currency') {
    // Preserve only digits, decimal point, or negative symbol
    value = value.match(/^-|[\d.]/g).join('');
  } else if (Object.keys(deliminatedMaskRegex).includes(mask)) {
    // Remove the deliminators and revert to single ungrouped string
    value = toInt(value);
  } else {
    return rawValue;
  }

  return value;
}

exports.default = Mask;