'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A `TextField` component renders an input field as well as supporting UI
 * elements like a label, error message, and hint text.
 */
var TextField = exports.TextField = function (_React$PureComponent) {
  _inherits(TextField, _React$PureComponent);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props));

    _this.id = props.id || (0, _lodash2.default)('textfield_');
    return _this;
  }

  _createClass(TextField, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          labelClassName = _props.labelClassName,
          fieldClassName = _props.fieldClassName,
          errorMessage = _props.errorMessage,
          hint = _props.hint,
          id = _props.id,
          requirementLabel = _props.requirementLabel,
          inversed = _props.inversed,
          rows = _props.rows,
          multiline = _props.multiline,
          label = _props.label,
          fieldRef = _props.fieldRef,
          type = _props.type,
          fieldProps = _objectWithoutProperties(_props, ['className', 'labelClassName', 'fieldClassName', 'errorMessage', 'hint', 'id', 'requirementLabel', 'inversed', 'rows', 'multiline', 'label', 'fieldRef', 'type']);

      var FieldComponent = multiline ? 'textarea' : 'input';
      var _rows = multiline && rows ? rows : undefined;

      var classes = (0, _classnames2.default)('ds-u-clearfix', // fixes issue where the label's margin is collapsed
      className);
      var fieldClasses = (0, _classnames2.default)('ds-c-field', {
        'ds-c-field--error': typeof errorMessage === 'string',
        'ds-c-field--inverse': inversed
      }, fieldClassName);

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          _FormLabel2.default,
          {
            className: labelClassName,
            errorMessage: errorMessage,
            fieldId: this.id,
            hint: hint,
            requirementLabel: requirementLabel,
            inversed: inversed
          },
          label
        ),
        _react2.default.createElement(FieldComponent, _extends({
          className: fieldClasses,
          id: this.id,
          ref: fieldRef,
          rows: _rows,
          type: multiline ? undefined : type
        }, fieldProps))
      );
    }
  }]);

  return TextField;
}(_react2.default.PureComponent);

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  /**
   * Additional classes to be added to the root `div` element
   */
  className: _propTypes2.default.string,
  /**
   * Sets the initial value. Use this for an uncontrolled component; otherwise,
   * use the `value` property.
   */
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  disabled: _propTypes2.default.bool,
  errorMessage: _propTypes2.default.node,
  /**
   * Additional classes to be added to the field element
   */
  fieldClassName: _propTypes2.default.string,
  /**
   * Access a reference to the `input` or `textarea` element
   */
  fieldRef: _propTypes2.default.func,
  /**
   * Additional hint text to display
   */
  hint: _propTypes2.default.node,
  /**
   * A unique `id` to be used on the text field.
   */
  id: _propTypes2.default.string,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: _propTypes2.default.node,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: _propTypes2.default.bool,
  /**
   * Label for the input
   */
  label: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the label
   */
  labelClassName: _propTypes2.default.string,
  /**
   * `max` HTML input attribute
   */
  max: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  /**
   * `min` HTML input attribute
   */
  min: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  /**
   * Whether or not the textfield is a multiline textfield
   */
  multiline: _propTypes2.default.bool,
  name: _propTypes2.default.string.isRequired,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  /**
   * Optionally specify the number of visible text lines for the field. Only
   * applicable if this is a multiline field.
   */
  rows: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  /**
   * Any valid `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
   */
  type: _propTypes2.default.string,
  /**
   * Sets the input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = TextField;