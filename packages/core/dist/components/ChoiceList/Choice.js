'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Choice = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _evEmitter = require('ev-emitter');

var _evEmitter2 = _interopRequireDefault(_evEmitter);

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

/** Used to emit events to all Choice components */
var dsChoiceEmitter = new _evEmitter2.default();

/**
 * A `Choice` component can be used to render a checkbox or radio button.
 *
 * Any _undocumented_ props that you pass to this component will be passed
 * to the `input` element, so you can use this to set additional attributes if
 * necessary.
 */

var Choice = exports.Choice = function (_React$PureComponent) {
  _inherits(Choice, _React$PureComponent);

  function Choice(props) {
    _classCallCheck(this, Choice);

    var _this = _possibleConstructorReturn(this, (Choice.__proto__ || Object.getPrototypeOf(Choice)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.id = _this.props.id || (0, _lodash2.default)(_this.props.type + '_' + _this.props.name + '_');

    if (typeof _this.props.checked === 'undefined') {
      _this.isControlled = false;
      // Since this isn't a controlled component, we need a way
      // to track when the value has changed. This can then be used
      // to identify when to toggle the visibility of (un)checkedChildren
      _this.state = { checked: _this.props.defaultChecked };

      // Event emitters are only relevant for uncontrolled radio buttons
      if (_this.props.type === 'radio') {
        _this.uncheckEventName = _this.props.name + '-uncheck';
        dsChoiceEmitter.on(_this.uncheckEventName, _this.handleUncheck.bind(_this));
      }
    } else {
      _this.isControlled = true;
    }
    return _this;
  }

  _createClass(Choice, [{
    key: 'checked',
    value: function checked() {
      if (this.isControlled) {
        return this.props.checked;
      }

      return this.state.checked;
    }

    /**
     * A radio button doesn't receive an onChange event when it is unchecked,
     * so we fire an "uncheck" event when any radio option is selected. This
     * allows us to check each radio options' checked state.
     * @param {String} checkedId - ID of the checked radio option
     */

  }, {
    key: 'handleUncheck',
    value: function handleUncheck(checkedId) {
      if (checkedId !== this.id && this.input.checked !== this.state.checked) {
        this.setState({ checked: this.input.checked });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(evt) {
      if (this.props.onChange) {
        this.props.onChange(evt);
      }

      if (!this.isControlled) {
        this.setState({ checked: evt.target.checked });
      }

      if (this.uncheckEventName && evt.target.checked) {
        // Emit the uncheck event so other radio options update their state
        dsChoiceEmitter.emitEvent(this.uncheckEventName, [this.id]);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          checkedChildren = _props.checkedChildren,
          children = _props.children,
          className = _props.className,
          inversed = _props.inversed,
          inputPlacement = _props.inputPlacement,
          inputClassName = _props.inputClassName,
          requirementLabel = _props.requirementLabel,
          size = _props.size,
          uncheckedChildren = _props.uncheckedChildren,
          inputProps = _objectWithoutProperties(_props, ['checkedChildren', 'children', 'className', 'inversed', 'inputPlacement', 'inputClassName', 'requirementLabel', 'size', 'uncheckedChildren']);

      var inputClasses = (0, _classnames2.default)(inputClassName, 'ds-c-choice', {
        'ds-c-choice--inverse': inversed,
        'ds-c-choice--right': inputPlacement === 'right',
        'ds-c-choice--small': size === 'small'
      });

      // Remove props we have our own implementations for
      if (inputProps.id) delete inputProps.id;
      if (inputProps.onChange) delete inputProps.onChange;

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement('input', _extends({
          className: inputClasses,
          id: this.id,
          onChange: this.handleChange,
          ref: function ref(input) {
            _this2.input = input;
          }
        }, inputProps)),
        _react2.default.createElement(
          _FormLabel2.default,
          { fieldId: this.id, requirementLabel: requirementLabel },
          children
        ),
        this.checked() ? checkedChildren : uncheckedChildren
      );
    }
  }]);

  return Choice;
}(_react2.default.PureComponent);

Choice.defaultProps = {
  type: 'checkbox',
  inputPlacement: 'left'
};

Choice.propTypes = {
  /**
   * Label text or HTML.
   */
  children: _propTypes2.default.node.isRequired,
  /**
   * Sets the input's `checked` state. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultChecked`.
   */
  checked: _propTypes2.default.bool,
  /**
   * Content to be shown when the choice is checked
   */
  checkedChildren: _propTypes2.default.node,
  /**
   * Content to be shown when the choice is not checked
   */
  uncheckedChildren: _propTypes2.default.node,
  /**
   * Additional classes to be added to the root `div` element.
   */
  className: _propTypes2.default.string,
  /**
   * Additional classes to be added to the `input` element.
   */
  inputClassName: _propTypes2.default.string,
  /**
   * Sets the initial `checked` state. Use this for an uncontrolled component;
   * otherwise, use the `checked` property.
   */
  defaultChecked: _propTypes2.default.bool,
  /**
   * A unique ID to be used for the input field, as well as the label's
   * `for` attribute. A unique ID will be generated if one isn't provided.
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
   * Placement of the input relative to the text label
   */
  inputPlacement: _propTypes2.default.oneOf(['left', 'right']),
  size: _propTypes2.default.oneOf(['small']),
  /**
   * The `input` field's `name` attribute
   */
  name: _propTypes2.default.string.isRequired,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  type: _propTypes2.default.oneOf(['checkbox', 'radio']),
  /**
   * The `input` `value` attribute
   */
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired
};

exports.default = Choice;