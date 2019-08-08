'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactAriaModal = require('react-aria-modal');

var _reactAriaModal2 = _interopRequireDefault(_reactAriaModal);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Dialog = function Dialog(props) {
  var actions = props.actions,
      actionsClassName = props.actionsClassName,
      ariaCloseLabel = props.ariaCloseLabel,
      children = props.children,
      className = props.className,
      closeButtonSize = props.closeButtonSize,
      closeButtonVariation = props.closeButtonVariation,
      closeText = props.closeText,
      escapeExitDisabled = props.escapeExitDisabled,
      headerClassName = props.headerClassName,
      onExit = props.onExit,
      size = props.size,
      title = props.title,
      modalProps = _objectWithoutProperties(props, ['actions', 'actionsClassName', 'ariaCloseLabel', 'children', 'className', 'closeButtonSize', 'closeButtonVariation', 'closeText', 'escapeExitDisabled', 'headerClassName', 'onExit', 'size', 'title']);

  var dialogClassNames = (0, _classnames2.default)('ds-c-dialog', 'ds-base', className, size && 'ds-c-dialog--' + size);
  var headerClassNames = (0, _classnames2.default)('ds-c-dialog__header', headerClassName);
  var actionsClassNames = (0, _classnames2.default)('ds-c-dialog__actions', actionsClassName);

  /* eslint-disable jsx-a11y/no-redundant-roles */
  return _react2.default.createElement(
    _reactAriaModal2.default,
    _extends({
      dialogClass: dialogClassNames,
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
        { className: headerClassNames, role: 'banner' },
        title && _react2.default.createElement(
          'h1',
          { className: 'ds-h2', id: 'dialog-title' },
          title
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            'aria-label': ariaCloseLabel,
            className: 'ds-c-dialog__close',
            onClick: onExit,
            size: closeButtonSize,
            variation: closeButtonVariation
          },
          closeText
        )
      ),
      _react2.default.createElement(
        'main',
        { role: 'main' },
        children
      ),
      actions && _react2.default.createElement(
        'aside',
        { className: actionsClassNames, role: 'complementary' },
        actions
      )
    )
  );
};

exports.Dialog = Dialog;
Dialog.defaultProps = {
  ariaCloseLabel: 'Close modal dialog',
  closeButtonVariation: 'transparent',
  closeText: 'Close',
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
   * Additional classes to be added to the actions container.
   */
  actionsClassName: _propTypes2.default.string,
  /**
   * Aria label for the close button
   */
  ariaCloseLabel: _propTypes2.default.string,
  /**
   * The modal's body content
   */
  children: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the root dialog element.
   */
  className: _propTypes2.default.string,
  /**
   * Size of the close button. See [Button component]({{root}}/components/button/#components.button.react)
   */
  closeButtonSize: _propTypes2.default.oneOf(['small', 'big']),
  /**
   * Variation string to be applied to close button component. See [Button component]({{root}}/components/button/#components.button.react)
   */
  closeButtonVariation: _propTypes2.default.string,
  /**
   * For internationalization purposes, the text for the "Close" button must be
   * passed in as a prop.
   */
  closeText: _propTypes2.default.string,
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
   * Additional classes to be added to the header, which wraps the title and
   * close button.
   */
  headerClassName: _propTypes2.default.string,
  /**
   * A method to handle the state change of exiting (or deactivating)
   * the modal. It will be invoked when the user presses Escape, or clicks outside
   * the dialog (if `underlayClickExits=true`).
   */
  onExit: _propTypes2.default.func,
  size: _propTypes2.default.oneOf(['narrow', 'wide', 'full']),
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