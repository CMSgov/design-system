'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateField = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FormLabel = require('../FormLabel/FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('../TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateField = exports.DateField = function (_React$PureComponent) {
  _inherits(DateField, _React$PureComponent);

  function DateField(props) {
    _classCallCheck(this, DateField);

    var _this = _possibleConstructorReturn(this, (DateField.__proto__ || Object.getPrototypeOf(DateField)).call(this, props));

    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(DateField, [{
    key: 'formatDate',
    value: function formatDate() {
      if (this.props.dateFormatter) {
        var values = {
          month: this.monthInput.value,
          day: this.dayInput.value,
          year: this.yearInput.value
        };

        return this.props.dateFormatter(values);
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(evt) {
      if (this.props.onBlur) {
        this.props.onBlur(evt, this.formatDate());
      }

      if (this.props.onComponentBlur) {
        this.handleComponentBlur(evt);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(evt) {
      this.props.onChange(evt, this.formatDate());
    }
  }, {
    key: 'handleComponentBlur',
    value: function handleComponentBlur(evt) {
      var _this2 = this;

      // The active element is always the document body during a focus
      // transition, so in order to check if the newly focused element
      // is one of our other date inputs, we're going to have to wait
      // a bit.
      setTimeout(function () {
        if (document.activeElement !== _this2.dayInput && document.activeElement !== _this2.monthInput && document.activeElement !== _this2.yearInput) {
          _this2.props.onComponentBlur(evt, _this2.formatDate());
        }
      }, 20);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var sharedDateFieldProps = {
        className: 'ds-l-col--auto',
        labelClassName: 'ds-u-margin-top--1',
        inversed: this.props.inversed,
        onBlur: (this.props.onBlur || this.props.onComponentBlur) && this.handleBlur,
        onChange: this.props.onChange && this.handleChange,
        type: 'number'
      };

      return _react2.default.createElement(
        'fieldset',
        { className: 'ds-c-fieldset' },
        _react2.default.createElement(
          _FormLabel2.default,
          {
            component: 'legend',
            errorMessage: this.props.errorMessage,
            hint: this.props.hint,
            inversed: this.props.inversed,
            requirementLabel: this.props.requirementLabel
          },
          _react2.default.createElement(
            'span',
            { className: 'ds-u-font-weight--bold' },
            this.props.label
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'ds-l-form-row' },
          _react2.default.createElement(_TextField2.default, _extends({}, sharedDateFieldProps, {
            fieldClassName: (0, _classnames2.default)('ds-c-field--month', {
              'ds-c-field--error': this.props.monthInvalid
            }),
            fieldRef: function fieldRef(el) {
              _this3.monthInput = el;
              if (_this3.props.monthFieldRef) _this3.props.monthFieldRef(el);
            },
            max: '12',
            min: '1',
            defaultValue: this.props.monthDefaultValue,
            label: this.props.monthLabel,
            name: this.props.monthName,
            value: this.props.monthValue
          })),
          _react2.default.createElement(_TextField2.default, _extends({}, sharedDateFieldProps, {
            fieldClassName: (0, _classnames2.default)('ds-c-field--day', {
              'ds-c-field--error': this.props.dayInvalid
            }),
            fieldRef: function fieldRef(el) {
              _this3.dayInput = el;
              if (_this3.props.dayFieldRef) _this3.props.dayFieldRef(el);
            },
            max: '31',
            min: '1',
            defaultValue: this.props.dayDefaultValue,
            label: this.props.dayLabel,
            name: this.props.dayName,
            value: this.props.dayValue
          })),
          _react2.default.createElement(_TextField2.default, _extends({}, sharedDateFieldProps, {
            fieldClassName: (0, _classnames2.default)('ds-c-field--year', {
              'ds-c-field--error': this.props.yearInvalid
            }),
            fieldRef: function fieldRef(el) {
              _this3.yearInput = el;
              if (_this3.props.yearFieldRef) _this3.props.yearFieldRef(el);
            },
            defaultValue: this.props.yearDefaultValue,
            label: this.props.yearLabel,
            min: this.props.yearMin,
            max: this.props.yearMax,
            name: this.props.yearName,
            value: this.props.yearValue
          }))
        )
      );
    }
  }]);

  return DateField;
}(_react2.default.PureComponent);

DateField.defaultProps = {
  label: 'Date',
  hint: 'For example: 4/25/1986',
  dayLabel: 'Day',
  dayName: 'day',
  monthLabel: 'Month',
  monthName: 'month',
  yearLabel: 'Year',
  yearMin: 1900,
  yearName: 'year'
};

DateField.propTypes = {
  /**
   * Optional method to format the `input` field values. If this
   * method is provided, the returned value will be passed as a second argument
   * to the `onBlur` and `onChange` callbacks. This method receives an object as
   * its only argument, in the shape of: `{ day, month, year }`
   */
  dateFormatter: _propTypes2.default.func,
  errorMessage: _propTypes2.default.node,
  /**
   * Additional hint text to display above the individual month/day/year fields
   */
  hint: _propTypes2.default.node,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: _propTypes2.default.bool,
  /**
   * The primary label, rendered above the individual month/day/year fields
   */
  label: _propTypes2.default.node,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: _propTypes2.default.node,
  /**
   * Called anytime any date input is blurred
   */
  onBlur: _propTypes2.default.func,
  /**
   * Called when any date input is blurred and the focus does not land on one
   * of the other date inputs inside this component (i.e., when the whole
   * component loses focus)
   */
  onComponentBlur: _propTypes2.default.func,
  /**
   * Called anytime any date input is changed
   */
  onChange: _propTypes2.default.func,
  /**
   * Label for the day field
   */
  dayLabel: _propTypes2.default.node,
  /**
   * `name` for the day `input` field
   */
  dayName: _propTypes2.default.string,
  /**
   * Initial value for the day `input` field. Use this for an uncontrolled
   * component; otherwise, use the `dayValue` property.
   */
  dayDefaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * Access a reference to the day `input`
   */
  dayFieldRef: _propTypes2.default.func,
  /**
   * Apply error styling to the day `input`
   */
  dayInvalid: _propTypes2.default.bool,
  /**
   * Sets the day input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `dayDefaultValue`.
   */
  dayValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * Label for the month field
   */
  monthLabel: _propTypes2.default.node,
  /**
   * `name` for the month `input` field
   */
  monthName: _propTypes2.default.string,
  /**
   * Initial value for the month `input` field. Use this for an uncontrolled
   * component; otherwise, use the `monthValue` property.
   */
  monthDefaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * Access a reference to the month `input`
   */
  monthFieldRef: _propTypes2.default.func,
  /**
   * Apply error styling to the month `input`
   */
  monthInvalid: _propTypes2.default.bool,
  /**
   * Sets the month input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `monthDefaultValue`.
   */
  monthValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * Initial value for the year `input` field. Use this for an uncontrolled
   * component; otherwise, use the `yearValue` property.
   */
  yearDefaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * Access a reference to the year `input`
   */
  yearFieldRef: _propTypes2.default.func,
  /**
   * Apply error styling to the year `input`
   */
  yearInvalid: _propTypes2.default.bool,
  /**
   * Label for the year `input` field
   */
  yearLabel: _propTypes2.default.node,
  /**
   * Max value for the year `input` field
   */
  yearMax: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * Minimum value for the year `input` field
   */
  yearMin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * `name` for the year field
   */
  yearName: _propTypes2.default.string,
  /**
   * Sets the year input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `yearDefaultValue`.
   */
  yearValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = DateField;