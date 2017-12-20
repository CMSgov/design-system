'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactAriaModal = require('react-aria-modal');

var _reactAriaModal2 = _interopRequireDefault(_reactAriaModal);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Dialog = function Dialog(props) {
  var actions = props.actions,
      ariaCloseLabel = props.ariaCloseLabel,
      children = props.children,
      escapeExitDisabled = props.escapeExitDisabled,
      onExit = props.onExit,
      title = props.title,
      modalProps = _objectWithoutProperties(props, ['actions', 'ariaCloseLabel', 'children', 'escapeExitDisabled', 'onExit', 'title']);

  /* eslint-disable jsx-a11y/no-redundant-roles */


  return _react2.default.createElement(
    _reactAriaModal2.default,
    _extends({
      dialogClass: 'ds-c-dialog',
      escapeExits: !escapeExitDisabled,
      includeDefaultStyles: false,
      onExit: onExit,
      titleId: 'dialog-title',
      underlayClass: 'ds-c-dialog-wrap'
    }, modalProps),
    _react2.default.createElement(
      'div',
      { role: 'document' },
      _react2.default.createElement(
        'header',
        { className: 'ds-c-dialog__header', role: 'banner' },
        title && _react2.default.createElement(
          'h1',
          { className: 'ds-h2', id: 'dialog-title' },
          title
        ),
        _react2.default.createElement(
          'button',
          {
            'aria-label': ariaCloseLabel,
            className: 'ds-c-button ds-c-button--transparent ds-c-dialog__close',
            onClick: onExit
          },
          'Close'
        )
      ),
      _react2.default.createElement(
        'main',
        { role: 'main' },
        children
      ),
      actions && _react2.default.createElement(
        'aside',
        { className: 'ds-c-dialog__actions', role: 'complementary' },
        actions
      )
    )
  );
};

exports.Dialog = Dialog;
Dialog.defaultProps = {
  ariaCloseLabel: 'Close modal dialog',
  escapeExitDisabled: false,
  underlayClickExits: false
};

Dialog.propTypes = {
  /**
   * If `true`, the modal will receive a role of `alertdialog`, instead of its
   * default `dialog`. The `alertdialog` role should only be used when an
   * alert, error, or warning occurs.
   */
  alert: _propTypes2.default.bool,
  /**
   * Provide a **DOM node** which contains your page's content (which the modal should render
   * outside of). When the modal is open this node will receive `aria-hidden="true"`.
   * This can help screen readers understand what's going on.
   * Also see `getApplicationNode`.
   */
  applicationNode: function applicationNode(props, propName, componentName) {
    if (props[propName] && props[propName] instanceof Element === false) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Expected a DOM node. You may also be interested in the getApplicationNode prop');
    }
  },
  /**
   * Buttons or other HTML to be rendered in the "actions" bar
   * at the bottom of the dialog.
   */
  actions: _propTypes2.default.node,
  /**
   * Aria label for the close button
   */
  ariaCloseLabel: _propTypes2.default.string,
  /**
   * The modal's body content
   */
  children: _propTypes2.default.node.isRequired,
  /**
   * Disable exiting the dialog when a user presses the Escape key.
   */
  escapeExitDisabled: _propTypes2.default.bool,
  /**
   * Same as `applicationNode`, but a function that returns the node instead of
   * the node itself. The function will not be called until after the component
   * mounts, so it's safe to use browser globals and refer to DOM nodes within
   * it (e.g. `document.getElementById(..)`)
   */
  getApplicationNode: _propTypes2.default.func,
  /**
   * A method to handle the state change of exiting (or deactivating)
   * the modal. It will be invoked when the user presses Escape, or clicks outside
   * the dialog (if `underlayClickExits=true`).
   */
  onExit: _propTypes2.default.func,
  /**
   * The Dialog's title, to be rendered in the header alongside the close button.
   */
  title: _propTypes2.default.node,
  /**
   * Enable exiting the dialog when a user clicks the underlay.
   */
  underlayClickExits: _propTypes2.default.bool
};

exports.default = Dialog;