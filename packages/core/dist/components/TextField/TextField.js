'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = undefined;

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

    _this.id = (0, _lodash2.default)('textfield_');
    return _this;
  }

  _createClass(TextField, [{
    key: 'render',
    value: function render() {
      var FieldComponent = this.props.multiline ? 'textarea' : 'input';
      var rows = this.props.multiline && this.props.rows ? this.props.rows : undefined;

      var classes = (0, _classnames2.default)('ds-u-clearfix', // fixes issue where the label's margin is collapsed
      this.props.className);
      var fieldClasses = (0, _classnames2.default)('ds-c-field', {
        'ds-c-field--error': typeof this.props.errorMessage === 'string',
        'ds-c-field--inverse': this.props.inversed
      }, this.props.fieldClassName);

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          _FormLabel2.default,
          {
            className: this.props.labelClassName,
            errorMessage: this.props.errorMessage,
            fieldId: this.id,
            hint: this.props.hint,
            inversed: this.props.inversed
          },
          this.props.label
        ),
        _react2.default.createElement(FieldComponent, {
          className: fieldClasses,
          defaultValue: this.props.defaultValue,
          disabled: this.props.disabled,
          id: this.id,
          name: this.props.name,
          onChange: this.props.onChange,
          onBlur: this.props.onBlur,
          rows: rows,
          type: this.props.multiline ? undefined : this.props.type,
          value: this.props.value
        })
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
  defaultValue: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  errorMessage: _propTypes2.default.string,
  /**
   * Additional classes to be added to the field element
   */
  fieldClassName: _propTypes2.default.string,
  /**
   * Additional hint text to display
   */
  hint: _propTypes2.default.node,
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
   * **Note**: Setting this prop will render a read-only field. If the field should be
   * mutable, use `defaultValue`. Otherwise, set `onChange` or `disabled`.
   */
  value: _propTypes2.default.string
};

exports.default = TextField;