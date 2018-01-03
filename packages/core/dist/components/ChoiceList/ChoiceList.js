'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoiceList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Choice = require('./Choice');

var _Choice2 = _interopRequireDefault(_Choice);

var _FormLabel = require('../FormLabel/FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.uniqueid');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A `ChoiceList` component can be used to render a select menu, radio
 * button group, or checkbox group.
 *
 * By default the component determines the type of field for you, taking
 * into account accessibility and usability best practices. So, you can pass in
 * an array of `choices` and let it determine what type of field would be best for
 * the user, or alternatively you can manually pass in the `type` prop.
 */
var ChoiceList = exports.ChoiceList = function (_React$PureComponent) {
  _inherits(ChoiceList, _React$PureComponent);

  function ChoiceList() {
    _classCallCheck(this, ChoiceList);

    return _possibleConstructorReturn(this, (ChoiceList.__proto__ || Object.getPrototypeOf(ChoiceList)).apply(this, arguments));
  }

  _createClass(ChoiceList, [{
    key: 'field',

    /**
     * Creates the field component(s) based on the type of field we've determined
     * it should be.
     */
    value: function field() {
      var _this2 = this;

      var type = this.type();
      var ChoiceComponent = type === 'select' ? 'option' : _Choice2.default;
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
          ChoiceComponent,
          _extends({ key: choice.value }, props),
          label
        );
      });

      if (type === 'select') {
        return this.select(selectProps, choices);
      }

      return choices;
    }

    /**
     * If this is a <select> element, then we need to generate the ID here
     * so it can be shared between the FormLabel and Select component
     */

  }, {
    key: 'id',
    value: function id() {
      // ID will be generated by the Choice component
      if (this.type() !== 'select') return;

      if (!this._id) {
        // Cache the ID so we're not regenerating it on each method call
        this._id = (0, _lodash2.default)('select_' + this.props.name + '_');
      }

      return this._id;
    }

    /**
     * @param {object} selectProps
     * @param {array} options - <option> components
     */

  }, {
    key: 'select',
    value: function select(selectProps, options) {
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
        options
      );
    }

    /**
     * Determines the type of field(s) we should render based on a few factors
     */

  }, {
    key: 'type',
    value: function type() {
      if (this.props.type) {
        return this.props.type;
      }

      if (this.props.multiple || this.props.choices.length === 1) {
        // Prefer a checkbox when multiple choices can be selected, since users
        // have trouble selecting multiple choices from a select menu. And if only
        // one choice is available, then a radio button would prevent a user from
        // deselecting the field.
        return 'checkbox';
      } else if (this.props.choices.length > 7) {
        // Prefer a select menu when the list has "many" choices.
        // TODO(sawyer): More research needed to determine what's considered "many"
        return 'select';
      }

      return 'radio';
    }
  }, {
    key: 'render',
    value: function render() {
      var type = this.type();
      var classes = (0, _classnames2.default)({ 'ds-c-fieldset': type !== 'select' }, this.props.className);
      var RootComponent = type === 'select' ? 'div' : 'fieldset';
      var FormLabelComponent = type === 'select' ? 'label' : 'legend';

      return _react2.default.createElement(
        RootComponent,
        { className: classes || null },
        _react2.default.createElement(
          _FormLabel2.default,
          {
            className: this.props.labelClassName,
            component: FormLabelComponent,
            errorMessage: this.props.errorMessage,
            fieldId: this.id(),
            hint: this.props.hint,
            requirementLabel: this.props.requirementLabel,
            inversed: this.props.inversed
          },
          this.props.label
        ),
        this.field()
      );
    }
  }]);

  return ChoiceList;
}(_react2.default.PureComponent);

ChoiceList.propTypes = {
  /**
   * The list of choices to be rendered. The number of choices you pass in may
   * affect the type of field(s) rendered. See `type` for more info.
   */
  choices: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    checked: _Choice2.default.propTypes.checked,
    defaultChecked: _Choice2.default.propTypes.defaultChecked,
    disabled: _Choice2.default.propTypes.disabled,
    label: _Choice2.default.propTypes.children,
    value: _Choice2.default.propTypes.value,
    requirementLabel: _propTypes2.default.node
  })).isRequired,
  /**
   * Additional classes to be added to the root element.
   */
  className: _propTypes2.default.string,
  /**
   * Disables the entire field.
   */
  disabled: _propTypes2.default.bool,
  errorMessage: _propTypes2.default.node,
  /**
   * Additional hint text to display
   */
  hint: _propTypes2.default.node,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: _propTypes2.default.node,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: _propTypes2.default.bool,
  /**
   * Label for the field
   */
  label: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: _propTypes2.default.string,
  /**
   * Allows the user to select multiple choices. Setting this to `true` results
   * in a list of checkbox fields to be rendered.
   */
  multiple: _propTypes2.default.bool,
  /**
   * The field's `name` attribute
   */
  name: _propTypes2.default.string.isRequired,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  /**
   * You can manually set the `type` if you prefer things to be less magical.
   * Otherwise, the type will be inferred by the other `props`, based
   * on what's best for accessibility and usability. If `multiple` is `true`, then
   * `checkbox` fields will be rendered. If less than 10 choices are passed in,
   * then `radio` buttons will be rendered.
   */
  type: _propTypes2.default.oneOf(['checkbox', 'radio', 'select'])
};

exports.default = ChoiceList;