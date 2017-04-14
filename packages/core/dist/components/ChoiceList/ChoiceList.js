'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoiceList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Choice = require('./Choice');

var _Choice2 = _interopRequireDefault(_Choice);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FormLabel = require('../Form/FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _lodash = require('lodash.uniqueid');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A `ChoiceList` is a component that decides for you whether a group of choices
 * should be displayed as checkboxes, radio buttons, or a select menu. This
 * component renders both a field label and field(s).
 *
 * Why might you want to use this? One big reason is that accessibility best
 * practices are baked in. View the Props documentation below for more info.
 */
var ChoiceList = exports.ChoiceList = function (_React$PureComponent) {
  _inherits(ChoiceList, _React$PureComponent);

  function ChoiceList() {
    _classCallCheck(this, ChoiceList);

    return _possibleConstructorReturn(this, (ChoiceList.__proto__ || Object.getPrototypeOf(ChoiceList)).apply(this, arguments));
  }

  _createClass(ChoiceList, [{
    key: 'choices',

    /**
     * The input/select component(s)
     */
    value: function choices() {
      var _this2 = this;

      // TODO(sawyer): This could be broken into two methods, one for gathering
      // the props and ComponentType, and another for compositing the components.
      // This would allow us to add support for a developer to pass in a
      // function that would override our composition function.
      var type = this.type();
      var ComponentType = type === 'select' ? 'option' : _Choice2.default;
      var selectProps = {};

      var choices = this.props.choices.map(function (choice) {
        var checked = choice.checked,
            defaultChecked = choice.defaultChecked,
            label = choice.label,
            props = _objectWithoutProperties(choice, ['checked', 'defaultChecked', 'label']);

        if (type === 'select') {
          if (checked) selectProps.value = props.value;
          if (defaultChecked) selectProps.defaultValue = props.value;
        } else {
          props.checked = checked;
          props.defaultChecked = defaultChecked;
          // Individual choices can be disabled as well as the entire list.
          // We only need to check for both options on checkbox/radio fields,
          // since the <Select> component handles the case where the entire list
          // is disabled.
          props.disabled = props.disabled || _this2.props.disabled;
          props.inversed = _this2.props.inversed;
          props.name = _this2.props.name;
          props.onBlur = _this2.props.onBlur;
          props.onChange = _this2.props.onChange;
          props.type = type;
        }

        return _react2.default.createElement(
          ComponentType,
          _extends({ key: choice.value }, props),
          label
        );
      });

      if (type === 'select') {
        return _react2.default.createElement(
          _Select2.default,
          _extends({
            disabled: this.props.disabled,
            id: this.id(),
            inversed: this.props.inversed,
            name: this.props.name,
            onBlur: this.props.onBlur,
            onChange: this.props.onChange
          }, selectProps),
          choices
        );
      }

      return choices;
    }

    /**
     * If this is a <select> element, then we need to generate the id here
     * so it can be shared between the FormLabel and Select component
     */

  }, {
    key: 'id',
    value: function id() {
      if (this.type() !== 'select') return;

      if (!this._id) {
        // Cache the ID so we're not regenerating the ID on each method call
        this._id = (0, _lodash2.default)('select_' + this.props.name + '_');
      }

      return this._id;
    }

    /**
     * Determine the type of field(s) we should render based on a few factors,
     * such as if multiple choices can be selected and the total number of choices.
     */

  }, {
    key: 'type',
    value: function type() {
      if (this.props.type) {
        return this.props.type;
      }

      if (this.props.multiple) {
        return 'checkbox';
      } else if (this.props.choices.length > 10) {
        // [a11y] Prefer radio options when the list isn't super long.
        // TODO(sawyer): Do more research on how many choices is too many for a radio group.
        return 'select';
      }

      return 'radio';
    }
  }, {
    key: 'render',
    value: function render() {
      var type = this.type();
      var classes = (0, _classnames2.default)({ 'ds-c-fieldset': type !== 'select' }, this.props.className);
      var ParentComponentType = type === 'select' ? 'div' : 'fieldset';
      var labelComponent = type === 'select' ? 'label' : 'legend';

      return _react2.default.createElement(
        ParentComponentType,
        { className: classes || null },
        _react2.default.createElement(
          _FormLabel2.default,
          {
            className: this.props.labelClassName,
            component: labelComponent,
            errorMessage: this.props.errorMessage,
            fieldId: this.id(),
            hint: this.props.hint,
            inversed: this.props.inversed
          },
          this.props.label
        ),
        this.choices()
      );
    }
  }]);

  return ChoiceList;
}(_react2.default.PureComponent);

ChoiceList.propTypes = {
  /**
   * The list of choices to be rendered. The number of choices you pass in may
   * affect the type of list rendered. See `type` for more info.
   */
  choices: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    checked: _Choice2.default.propTypes.checked,
    defaultChecked: _Choice2.default.propTypes.defaultChecked,
    disabled: _Choice2.default.propTypes.disabled,
    label: _Choice2.default.propTypes.label,
    value: _Choice2.default.propTypes.value
  })).isRequired,
  /**
   * Additional classes to be added to the root element.
   */
  className: _propTypes2.default.string,
  /**
   * Disables the entire field and prevents the user from changing their selected choice(s).
   */
  disabled: _propTypes2.default.bool,
  errorMessage: _propTypes2.default.string,
  /**
   * Hint text. Typically this is a string, but you can pass in additional
   * HTML if you need to further format things.
   */
  hint: _propTypes2.default.node,
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: _propTypes2.default.bool,
  /**
   * The label for the entire list of choices
   */
  label: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: _propTypes2.default.string,
  /**
   * Allows the user to select multiple choices. If this is set to `true`, a
   * list of checkbox fields will be rendered.
   */
  multiple: _propTypes2.default.bool,
  name: _propTypes2.default.string.isRequired,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  /**
   * You can manually set the `type` if you prefer things to be less magical.
   * Otherwise, the type will be inferred by the other props you pass in, based
   * on what's best for accessibility and usability. If `multiple` is `true`, then
   * `checkbox` fields will be rendered. If less than 10 choices are passed in,
   * then `radio` buttons will be rendered.
   */
  type: _propTypes2.default.oneOf(['checkbox', 'radio', 'select'])
};

exports.default = ChoiceList;