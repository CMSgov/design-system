'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = undefined;

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
 * A `Dropdown` component can be used to render an HTML `select` menu.
 * Any _undocumented_ props that you pass to this component will be passed
 * to the `select` element, so you can use this to set additional attributes if
 * necessary.
 *
 * Class-based component gives flexibility for active focus management
 * by allowing refs to be passed.
 */
var Dropdown = exports.Dropdown = function (_React$PureComponent) {
  _inherits(Dropdown, _React$PureComponent);

  function Dropdown() {
    _classCallCheck(this, Dropdown);

    return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
  }

  _createClass(Dropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.focusTrigger) {
        this.selectRef && this.selectRef.focus();
      }
    }
  }, {
    key: 'id',
    value: function id() {
      if (!this._id) {
        // Cache the ID so we're not regenerating it on each method call
        this._id = (0, _lodash2.default)('select_' + this.props.name + '_');
      }
      return this._id;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      /* eslint-disable prefer-const */
      var _props = this.props,
          className = _props.className,
          errorMessage = _props.errorMessage,
          fieldClassName = _props.fieldClassName,
          fieldRef = _props.fieldRef,
          focusTrigger = _props.focusTrigger,
          hint = _props.hint,
          inversed = _props.inversed,
          label = _props.label,
          labelClassName = _props.labelClassName,
          options = _props.options,
          requirementLabel = _props.requirementLabel,
          size = _props.size,
          selectProps = _objectWithoutProperties(_props, ['className', 'errorMessage', 'fieldClassName', 'fieldRef', 'focusTrigger', 'hint', 'inversed', 'label', 'labelClassName', 'options', 'requirementLabel', 'size']);
      /* eslint-enable prefer-const */

      var classes = (0, _classnames2.default)(className);
      var fieldClasses = (0, _classnames2.default)('ds-c-field', { 'ds-c-field--inverse': inversed }, size && 'ds-c-field--' + size, fieldClassName);

      var optionElements = options.map(function (option) {
        return _react2.default.createElement(
          'option',
          { key: option.value, value: option.value },
          option.label
        );
      });

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          _FormLabel2.default,
          {
            className: labelClassName,
            component: 'label',
            errorMessage: errorMessage,
            fieldId: this.id(),
            hint: hint,
            requirementLabel: requirementLabel,
            inversed: inversed
          },
          label
        ),
        _react2.default.createElement(
          'select',
          _extends({
            className: fieldClasses,
            id: this.id()
            /* eslint-disable no-return-assign */
            , ref: function ref(_ref) {
              if (focusTrigger) {
                _this2.selectRef = _ref;
              }
              if (fieldRef) {
                fieldRef(_ref);
              }
            }
            /* eslint-enable no-return-assign */
          }, selectProps),
          optionElements
        )
      );
    }
  }]);

  return Dropdown;
}(_react2.default.PureComponent);

Dropdown.propTypes = {
  /**
   * Adds `aria-label` attribute if component renders a select
   */
  ariaLabel: _propTypes2.default.string,
  /**
   * Additional classes to be added to the root element.
   */
  className: _propTypes2.default.string,
  /**
   * Sets the initial selected state. Use this for an uncontrolled component;
   * otherwise, use the `value` property.
   */
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  /**
   * Disables the entire field.
   */
  disabled: _propTypes2.default.bool,
  errorMessage: _propTypes2.default.node,
  /**
   * Additional classes to be added to the select element
   */
  fieldClassName: _propTypes2.default.string,
  /**
   * Access a reference to the `select` element
   */
  fieldRef: _propTypes2.default.func,
  /**
   * Used to focus `select` on `componentDidMount()`
   */
  focusTrigger: _propTypes2.default.bool,
  /**
   * Additional hint text to display
   */
  hint: _propTypes2.default.node,
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
   * The field's `name` attribute
   */
  name: _propTypes2.default.string.isRequired,
  /**
   * The list of options to be rendered.
   */
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.node.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired
  })).isRequired,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: _propTypes2.default.node,
  /**
   * If the component renders a select, set the max-width of the input either to `'small'` or `'medium'`.
   */
  size: _propTypes2.default.oneOf(['small', 'medium']),
  /**
   * Sets the field's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

exports.default = Dropdown;