import AriaModal from 'react-aria-modal';
import PropTypes from 'prop-types';
import React from 'react';

export const Dialog = function(props) {
  const {
    actions,
    children,
    escapeExitDisabled,
    onExit,
    title,
    ...modalProps
  } = props;

  return (
    <AriaModal
      dialogClass="ds-c-dialog"
      escapeExits={!escapeExitDisabled}
      includeDefaultStyles={false}
      onExit={onExit}
      titleId="dialog-title"
      underlayClass="ds-c-dialog-wrap"
      {...modalProps}
    >
      <div role="document">
        <header className="ds-c-dialog__header">
          {title && (
            <h1 className="ds-h2" id="dialog-title">
              {title}
            </h1>
          )}
          <button
            className="ds-c-button ds-c-button--transparent ds-c-dialog__close"
            onClick={onExit}
          >
            Close
          </button>
        </header>
        {children}
        {actions && <div className="ds-c-dialog__actions">{actions}</div>}
      </div>
    </AriaModal>
  );
};

Dialog.defaultProps = {
  escapeExitDisabled: false,
  underlayClickExits: false
};

Dialog.propTypes = {
  /**
   * If `true`, the modal will receive a role of `alertdialog`, instead of its
   * default `dialog`. The `alertdialog` role should only be used when an
   * alert, error, or warning occurs.
   */
  alert: PropTypes.bool,
  /**
   * Provide a **DOM node** which contains your page's content (which the modal should render
   * outside of). When the modal is open this node will receive `aria-hidden="true"`.
   * This can help screen readers understand what's going on.
   * Also see `getApplicationNode`.
   */
  applicationNode: function(props, propName, componentName) {
    if (props[propName] && props[propName] instanceof Element === false) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${
          componentName
        }\`. Expected a DOM node. You may also be intersted in the getApplicationNode prop`
      );
    }
  },
  /**
   * Buttons or other HTML to be rendered in the "actions" bar
   * at the bottom of the dialog.
   */
  actions: PropTypes.node,
  /**
   * The modal's body content
   */
  children: PropTypes.node.isRequired,
  /**
   * Disable exiting the dialog when a user presses the Escape key.
   */
  escapeExitDisabled: PropTypes.bool,
  /**
   * Same as `applicationNode`, but a function that returns the node instead of
   * the node itself. The function will not be called until after the component
   * mounts, so it's safe to use browser globals and refer to DOM nodes within
   * it (e.g. `document.getElementById(..)`)
   */
  getApplicationNode: PropTypes.func,
  /**
   * A method to handle the state change of exiting (or deactivating)
   * the modal. It will be invoked when the user presses Escape, or clicks outside
   * the dialog (if `underlayClickExits=true`).
   */
  onExit: PropTypes.func,
  /**
   * The Dialog's title, to be rendered in the header alongside the close button.
   */
  title: PropTypes.node,
  /**
   * Enable exiting the dialog when a user clicks the underlay.
   */
  underlayClickExits: PropTypes.bool
};

export default Dialog;
