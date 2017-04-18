'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = undefined;

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
 * A `Select` component can be used to render an HTML `select` menu.
 * Any _undocumented_ props that you pass to this component will be passed
 * to the `select` element, so you can use this to set additional attributes if
 * necessary.
 */
var Select = function Select(props) {
  var children = props.children,
      className = props.className,
      id = props.id,
      inversed = props.inversed,
      selectProps = _objectWithoutProperties(props, ['children', 'className', 'id', 'inversed']);

  var classes = (0, _classnames2.default)('ds-c-field ds-c-field--select', { 'ds-c-field--inverse': inversed }, className);

  if (!id) {
    id = (0, _lodash2.default)('select_' + selectProps.name + '_');
  }

  return _react2.default.createElement(
    'select',
    _extends({
      className: classes,
      id: id
    }, selectProps),
    children
  );
};

exports.Select = Select;
Select.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the root `select` element.
   */
  className: _propTypes2.default.string,
  /**
   * Sets the initial `selected` state and allows the user to select a different
   * option without also requiring an `onChange` event handler.
   */
  defaultValue: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  /**
   * A unique ID to be used for the select field. A unique ID will be generated
   * if one isn't provided.
   */
  id: _propTypes2.default.string,
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: _propTypes2.default.bool,
  /**
   * Setting this prop to `true` will result in an error message due to
   * accessibility concerns. See the usability guidelines for more info.
   */
  multiple: function multiple(props, propName, componentName) {
    if (props[propName]) {
      return new Error('\'' + propName + '\' supplied to \'' + componentName + '\'. [A11Y]: Users often don\u2019t' + ' understand how to select multiple items from dropdowns. Use checkboxes instead.');
    }
  },
  name: _propTypes2.default.string.isRequired,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  /**
   * Setting this prop will render a read-only field and require an `onChange`
   * event handler if you'd want to change its `selected` stated. Use
   * `defaultValue` if you want the field to be mutable.
   */
  value: _propTypes2.default.string
};

exports.default = Select;