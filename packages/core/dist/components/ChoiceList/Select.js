'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
 * A `Select` component can be used to render an HTML `select` menu.
 * Any _undocumented_ props that you pass to this component will be passed
 * to the `select` element, so you can use this to set additional attributes if
 * necessary.
 *
 * Class-based component gives flexibility for active focus management
 * by allowing refs to be passed.
 */

var Select = exports.Select = function (_React$PureComponent) {
  _inherits(Select, _React$PureComponent);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
  }

  _createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.focusTrigger) {
        this.loader && this.loader.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      /* eslint-disable prefer-const */
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          focusTrigger = _props.focusTrigger,
          id = _props.id,
          inversed = _props.inversed,
          selectRef = _props.selectRef,
          size = _props.size,
          selectProps = _objectWithoutProperties(_props, ['children', 'className', 'focusTrigger', 'id', 'inversed', 'selectRef', 'size']);
      /* eslint-enable prefer-const */

      var classes = (0, _classnames2.default)('ds-c-field', { 'ds-c-field--inverse': inversed }, className, size && 'ds-c-field--' + size);

      if (!id) {
        id = (0, _lodash2.default)('select_' + selectProps.name + '_');
      }

      return _react2.default.createElement(
        'select',
        _extends({
          className: classes,
          id: id
          /* eslint-disable no-return-assign */
          , ref: focusTrigger ? function (loader) {
            return _this2.loader = loader;
          } : selectRef
          /* eslint-enable no-return-assign */
        }, selectProps),
        children
      );
    }
  }]);

  return Select;
}(_react2.default.PureComponent);

Select.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the root `select` element.
   */
  className: _propTypes2.default.string,
  /**
   * Sets the initial selected state. Use this for an uncontrolled component;
   * otherwise, use the `selected` property.
   */
  defaultValue: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  /**
   * Used to focus `select` on `componentDidMount()`
   */
  focusTrigger: _propTypes2.default.bool,
  /**
   * A unique ID to be used for the select field. A unique ID will be generated
   * if one isn't provided.
   */
  id: _propTypes2.default.string,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: _propTypes2.default.bool,
  /**
   * Setting this prop will result in a PropTypes error message due to
   * accessibility concerns. Use checkboxes instead if you need to support multiple
   * selections. See the Guidance tab for more info.
   */
  multiple: function multiple(props, propName, componentName) {
    if (props[propName]) {
      /* eslint-disable quotes */
      return new Error('\'' + propName + '\' supplied to \'' + componentName + '\'. [A11Y]: Users often don\u2019t' + ' understand how to select multiple items from dropdowns. Use checkboxes instead.');
      /* eslint-enable */
    }
  },
  /**
   * The `select` field's `name` attribute
   */
  name: _propTypes2.default.string.isRequired,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  /**
   * Access a reference to the `select` element
   */
  selectRef: _propTypes2.default.func,
  /**
   * Set the max-width of the input either to `'small'` or `'medium'`.
   */
  size: _propTypes2.default.oneOf(['small', 'medium']),
  /**
   * Sets the field's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: _propTypes2.default.string,

  /**
   * Adds `aria-label` attribute
   */
  'aria-label': _propTypes2.default.string
};

exports.default = Select;