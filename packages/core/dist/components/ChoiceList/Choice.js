'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Choice = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

/**
 * A `Choice` component can be used to render a checkbox or radio button.
 * Any _undocumented_ props that you pass to this component will be passed
 * to the `input` element, so you can use this to set additional attributes if
 * necessary.
 */
var Choice = function Choice(props) {
  var children = props.children,
      className = props.className,
      id = props.id,
      inversed = props.inversed,
      inputProps = _objectWithoutProperties(props, ['children', 'className', 'id', 'inversed']);

  var inputClasses = (0, _classnames2.default)('ds-c-choice', { 'ds-c-choice--inverse': inversed });

  if (!id) {
    id = (0, _lodash2.default)(inputProps.type + '_' + inputProps.name + '_');
  }

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement('input', _extends({
      className: inputClasses,
      id: id
    }, inputProps)),
    _react2.default.createElement(
      'label',
      { htmlFor: id },
      children
    )
  );
};

exports.Choice = Choice;
Choice.defaultProps = {
  type: 'checkbox'
};

Choice.propTypes = {
  /**
   * Label text or HTML.
   */
  children: _propTypes2.default.node.isRequired,
  /**
   * Setting this prop will render a read-only field and require an `onChange`
   * event handler if you'd want to check its checked stated. Use `defaultChecked`
   * if you want the field to be mutable.
   */
  checked: _propTypes2.default.bool,
  /**
   * Additional classes to be added to the root `div` element.
   */
  className: _propTypes2.default.string,
  /**
   * Sets the initial checked state and allows the user to check/uncheck the
   * field without also requiring an `onChange` event handler.
   */
  defaultChecked: _propTypes2.default.bool,
  /**
   * A unique ID to be used for the input field, as well as the label's
   * `for` attribute. A unique ID will be generated if one isn't provided.
   */
  id: _propTypes2.default.string,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: _propTypes2.default.bool,
  /**
   * The `input` `name` attribute
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