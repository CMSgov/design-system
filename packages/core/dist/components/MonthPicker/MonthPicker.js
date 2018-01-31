'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthPicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getMonthNames = getMonthNames;

require('core-js/fn/array/includes');

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Choice = require('../ChoiceList/Choice');

var _Choice2 = _interopRequireDefault(_Choice);

var _FormLabel = require('../FormLabel/FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.uniqueid');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
`<MonthPicker>`

@react-component MonthPicker

Style guide: components.month-picker.react
*/

var NUM_MONTHS = 12;
var monthNumbers = function () {
  var months = [];
  for (var m = 1; m <= NUM_MONTHS; m++) {
    months.push(m);
  }
  return months;
}();

/**
 * The `MonthPicker` component renders a grid of checkboxes with shortened month
 * names as well as buttons for selecting or deselecting all. For internationalization
 * one can pass a `locale` prop, and the month names will change to match the
 * language of the locale. Full month names are also included as `aria-label`
 * attributes.
 */

var MonthPicker = exports.MonthPicker = function (_React$PureComponent) {
  _inherits(MonthPicker, _React$PureComponent);

  function MonthPicker(props) {
    _classCallCheck(this, MonthPicker);

    var _this = _possibleConstructorReturn(this, (MonthPicker.__proto__ || Object.getPrototypeOf(MonthPicker)).call(this, props));

    _this.hintId = (0, _lodash2.default)('monthpicker_hint_');
    _this.labelId = (0, _lodash2.default)('monthpicker_label_');
    _this.months = getMonthNames(props.locale);
    _this.monthsLong = getMonthNames(props.locale, false);

    if (typeof props.selectedMonths === 'undefined') {
      _this.isControlled = false;
      // Since this isn't a controlled component, we need a way
      // to track when the value has changed.
      _this.state = {
        selectedMonths: props.defaultSelectedMonths || []
      };
    } else {
      _this.isControlled = true;
    }
    return _this;
  }

  _createClass(MonthPicker, [{
    key: 'selectedMonths',
    value: function selectedMonths() {
      if (this.isControlled) {
        return this.props.selectedMonths;
      }

      return this.state.selectedMonths;
    }
  }, {
    key: 'disabledMonths',
    value: function disabledMonths() {
      return this.props.disabledMonths || [];
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange(event);
      }

      if (!this.isControlled) {
        var month = parseInt(event.target.value);
        var selectedMonths = this.state.selectedMonths.slice();
        if (selectedMonths.includes(month)) {
          selectedMonths.splice(selectedMonths.indexOf(month), 1);
        } else {
          selectedMonths.push(month);
        }
        this.setState({ selectedMonths: selectedMonths });
      }
    }
  }, {
    key: 'handleSelectAll',
    value: function handleSelectAll() {
      if (this.props.onSelectAll) {
        this.props.onSelectAll();
      }

      if (!this.isControlled) {
        var disabledMonths = this.disabledMonths();
        var selectedMonths = monthNumbers.filter(function (m) {
          return !disabledMonths.includes(m);
        });
        this.setState({ selectedMonths: selectedMonths });
      }
    }
  }, {
    key: 'handleClearAll',
    value: function handleClearAll() {
      if (this.props.onClearAll) {
        this.props.onClearAll();
      }

      if (!this.isControlled) {
        this.setState({ selectedMonths: [] });
      }
    }
  }, {
    key: 'renderMonths',
    value: function renderMonths() {
      var _this2 = this;

      var selectedMonths = this.selectedMonths();
      var disabledMonths = this.disabledMonths();
      var _props = this.props,
          name = _props.name,
          inversed = _props.inversed;

      return _react2.default.createElement(
        'ol',
        { className: 'ds-c-list--bare ds-u-display--flex ds-u-justify-content--between ds-u-flex-wrap--wrap' },
        this.months.map(function (month, i) {
          return _react2.default.createElement(
            'li',
            { key: month },
            _react2.default.createElement(
              _Choice2.default,
              {
                'aria-describedby': _this2.props.hint ? _this2.hintId : null,
                'aria-label': _this2.monthsLong[i],
                checked: selectedMonths.includes(i + 1),
                className: 'ds-c-month-picker__month',
                disabled: disabledMonths.includes(i + 1),
                inversed: inversed,
                onChange: function onChange(e) {
                  return _this2.handleChange(e);
                },
                name: name,
                value: i + 1
              },
              month
            )
          );
        })
      );
    }
  }, {
    key: 'renderButton',
    value: function renderButton(text, onClick) {
      return _react2.default.createElement(
        _Button2.default,
        {
          'aria-describedby': this.labelId,
          size: 'small',
          className: 'ds-u-margin-right--1',
          onClick: onClick,
          inversed: this.props.inversed,
          variation: this.props.buttonVariation
        },
        text
      );
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      var classes = (0, _classnames2.default)('ds-u-font-weight--bold', this.props.labelClassName);
      return _react2.default.createElement(
        _FormLabel2.default,
        {
          className: 'ds-u-visibility--screen-reader',
          labelClassName: classes,
          component: 'legend',
          errorMessage: this.props.errorMessage,
          requirementLabel: this.props.requirementLabel,
          inversed: this.props.inversed
        },
        this.props.label
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          selectAllText = _props2.selectAllText,
          clearAllText = _props2.clearAllText;

      var Heading = this.props.headingLevel ? 'h' + this.props.headingLevel : 'h4';
      var classes = (0, _classnames2.default)('ds-c-month-picker', 'ds-c-fieldset', 'ds-u-margin-y--3', this.props.className);
      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            Heading,
            {
              className: 'ds-c-label ds-u-font-weight--bold ds-u-margin--0',
              id: this.labelId
            },
            this.props.label
          ),
          this.props.hint ? _react2.default.createElement(
            'p',
            {
              className: 'ds-c-label ds-c-field__hint ds-u-margin--0',
              id: this.hintId
            },
            this.props.hint
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'ds-u-margin-top--3' },
          this.renderButton(selectAllText, function () {
            return _this3.handleSelectAll();
          }),
          this.renderButton(clearAllText, function () {
            return _this3.handleClearAll();
          })
        ),
        _react2.default.createElement(
          'fieldset',
          { className: 'ds-c-fieldset' },
          this.renderLabel(),
          _react2.default.createElement(
            'div',
            { className: 'ds-c-month-picker__months' },
            this.renderMonths()
          )
        )
      );
    }
  }]);

  return MonthPicker;
}(_react2.default.PureComponent);

MonthPicker.defaultProps = {
  selectAllText: 'Select all',
  clearAllText: 'Clear all'
};

MonthPicker.propTypes = {
  /**
   * The `input` field's `name` attribute
   */
  name: _propTypes2.default.string.isRequired,
  /**
   * A [BCP 47 language tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
   * for month name localization. For example: Passing `es-US` as a value
   * will render month names in Spanish.
   */
  locale: _propTypes2.default.string,
  /**
   * Additional classes to be added to the root element.
   */
  className: _propTypes2.default.string,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: _propTypes2.default.bool,
  /**
   * Variation string to be applied to buttons. See [Button component]({{root}}/components/button/#components.button.react)
   */
  buttonVariation: _propTypes2.default.string,
  /**
   * Label for the field
   */
  label: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: _propTypes2.default.string,
  errorMessage: _propTypes2.default.node,
  /**
   * Additional hint text to display
   */
  hint: _propTypes2.default.node,
  /**
   * Heading type to override default `<h4>` in title block
   */
  headingLevel: _propTypes2.default.number,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: _propTypes2.default.node,
  /**
   * Array of month numbers, where `1` is January, and any month included
   * is disabled for selection.
   */
  disabledMonths: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /**
   * Array of month numbers, where `1` is January, and any month included
   * is selected. This will render a read-only field. If the field should
   * be mutable, use `defaultSelectedMonths`.
   */
  selectedMonths: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /**
   * Array of month numbers, where `1` is January, and any month included
   * is selected by default. Sets the initial checked state for the 12 month
   * checkboxes. Use this for an uncontrolled component; otherwise, use the
   * `selectedMonths` property.
   */
  defaultSelectedMonths: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /**
   * A callback function that's invoked when a month's checked state is changed.
   * Note: This callback is not called when a month is selected or deselected
   * via the "Select all" or "Clear all" buttons – use the `onSelectAll` and
   * `onClearAll` event handlers for those instances.
   */
  onChange: _propTypes2.default.func,
  onSelectAll: _propTypes2.default.func,
  onClearAll: _propTypes2.default.func,
  /**
   * For internationalization purposes, the text for the "Select all"
   * button must be passed in as a prop.
   */
  selectAllText: _propTypes2.default.string.isRequired,
  /**
   * For internationalization purposes, the text for the "Clear all"
   * button must be passed in as a prop.
   */
  clearAllText: _propTypes2.default.string.isRequired
};

exports.default = MonthPicker;

/**
 * Generates an array of month names according to the given or default locale
 *
 * @param  {string} [locale] locale for generating month names
 * @param  {boolean} [short] whether to return short month names
 * @return {string[]}        array of month names
 */

function getMonthNames(locale) {
  var short = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var options = { month: short ? 'short' : 'long' };
  var months = [];
  for (var i = 0; i < NUM_MONTHS; i++) {
    var date = new Date();
    date.setMonth(i, 1);
    months.push(date.toLocaleString(locale, options));
  }
  return months;
}