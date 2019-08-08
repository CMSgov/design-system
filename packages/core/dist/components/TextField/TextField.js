'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = exports.unmaskValue = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mask = require('./Mask');

Object.defineProperty(exports, 'unmaskValue', {
  enumerable: true,
  get: function get() {
    return _Mask.unmaskValue;
  }
});

var _FormLabel = require('../FormLabel/FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _Mask2 = _interopRequireDefault(_Mask);

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
    _this.labelId = props.labelId || (0, _lodash2.default)('textfield_label_');
    return _this;
  }

  _createClass(TextField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.focusTrigger) {
        this.loader && this.loader.focus();
      }
    }
  }, {
    key: 'ariaLabel',
    value: function ariaLabel() {
      if (this.props.ariaLabel) {
        return this.props.ariaLabel;
      } else if (this.props.mask === 'currency') {
        return this.props.label + '. Enter amount in dollars.';
      }
    }

    /**
     * @param {React.Component} field
     * @returns {React.Component} The input field, optionally including mask
     *  markup if a mask is present
     */

  }, {
    key: 'renderFieldAndMask',
    value: function renderFieldAndMask(field) {
      var maskName = this.props.mask;

      return maskName ? _react2.default.createElement(
        'div',
        { className: 'ds-c-field-mask ds-c-field-mask--' + maskName },
        this.renderMaskOverlay(),
        _react2.default.createElement(
          _Mask2.default,
          { mask: maskName },
          field
        )
      ) : field;
    }

    /**
     * UI overlayed on top of a field to support certain masks
     */

  }, {
    key: 'renderMaskOverlay',
    value: function renderMaskOverlay() {
      if (this.props.mask) {
        var content = {
          currency: '$'
        };

        return _react2.default.createElement(
          'div',
          {
            className: 'ds-c-field__before ds-c-field__before--' + this.props.mask
          },
          content[this.props.mask]
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          ariaLabel = _props.ariaLabel,
          className = _props.className,
          errorMessage = _props.errorMessage,
          fieldClassName = _props.fieldClassName,
          fieldRef = _props.fieldRef,
          focusTrigger = _props.focusTrigger,
          hint = _props.hint,
          id = _props.id,
          inversed = _props.inversed,
          label = _props.label,
          labelClassName = _props.labelClassName,
          labelId = _props.labelId,
          mask = _props.mask,
          multiline = _props.multiline,
          requirementLabel = _props.requirementLabel,
          rows = _props.rows,
          size = _props.size,
          type = _props.type,
          fieldProps = _objectWithoutProperties(_props, ['ariaLabel', 'className', 'errorMessage', 'fieldClassName', 'fieldRef', 'focusTrigger', 'hint', 'id', 'inversed', 'label', 'labelClassName', 'labelId', 'mask', 'multiline', 'requirementLabel', 'rows', 'size', 'type']);

      var FieldComponent = multiline ? 'textarea' : 'input';
      var _rows = multiline && rows ? rows : undefined;

      var classes = (0, _classnames2.default)('ds-u-clearfix', // fixes issue where the label's margin is collapsed
      className);

      var fieldClasses = (0, _classnames2.default)('ds-c-field', mask && 'ds-c-field--' + mask, {
        'ds-c-field--error': typeof errorMessage === 'string',
        'ds-c-field--inverse': inversed
      }, fieldClassName, size && 'ds-c-field--' + size);

      var field = _react2.default.createElement(FieldComponent, _extends({
        'aria-label': this.ariaLabel(),
        className: fieldClasses,
        id: this.id
        /* eslint-disable no-return-assign */
        , ref: focusTrigger ? function (loader) {
          return _this2.loader = loader;
        } : fieldRef
        /* eslint-enable no-return-assign */
        , rows: _rows,
        type: multiline ? undefined : type
      }, fieldProps));

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
            id: this.labelId,
            requirementLabel: requirementLabel,
            inversed: inversed
          },
          label
        ),
        this.renderFieldAndMask(field, mask)
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
   * Apply an `aria-label` to the text field to provide additional
   * context to assistive devices.
   */
  ariaLabel: _propTypes2.default.string,
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
   * Used to focus `input` on `componentDidMount()`
   */
  focusTrigger: _propTypes2.default.bool,
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
   * A unique `id` to be used on the label field.
   */
  labelId: _propTypes2.default.string,
  /**
   * Apply formatting to the field that's unique to the value
   * you expect to be entered. Depending on the mask, the
   * field's appearance and functionality may be affected.
   */
  mask: _propTypes2.default.oneOf(['currency', 'phone', 'ssn', 'zip']),
  /**
   * `max` HTML input attribute
   */
  max: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  /**
   * `min` HTML input attribute
   */
  min: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  /**
   * Whether or not the text field is a multiline text field
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
   * Set the max-width of the input either to `'small'` or `'medium'`.
   */
  size: _propTypes2.default.oneOf(['small', 'medium']),
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