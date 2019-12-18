import AriaModal from 'react-aria-modal';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const Dialog = function(props) {
  const {
    actions,
    actionsClassName,
    ariaCloseLabel,
    children,
    className,
    closeButtonSize,
    closeButtonVariation,
    closeText,
    escapeExitDisabled,
    headerClassName,
    onExit,
    size,
    title,
    ...modalProps
  } = props;

  const dialogClassNames = classNames(
    'ds-c-dialog',
    'ds-base',
    className,
    size && `ds-c-dialog--${size}`
  );
  const headerClassNames = classNames('ds-c-dialog__header', headerClassName);
  const actionsClassNames = classNames('ds-c-dialog__actions', actionsClassName);

  /* eslint-disable jsx-a11y/no-redundant-roles */
  return (
    <AriaModal
      dialogClass={dialogClassNames}
      escapeExits={!escapeExitDisabled}
      includeDefaultStyles={false}
      onExit={onExit}
      titleId="dialog-title"
      underlayClass="ds-c-dialog-wrap"
      {...modalProps}
    >
      <div role="document">
        <header className={headerClassNames} role="banner">
          {title && (
            <h1 className="ds-h2" id="dialog-title">
              {title}
            </h1>
          )}
          <Button
            aria-label={ariaCloseLabel}
            className="ds-c-dialog__close"
            onClick={onExit}
            size={closeButtonSize}
            variation={closeButtonVariation}
          >
            {closeText}
          </Button>
        </header>
        <main role="main">{children}</main>
        {actions && (
          <aside className={actionsClassNames} role="complementary">
            {actions}
          </aside>
        )}
      </div>
    </AriaModal>
  );
};

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
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected a DOM node. You may also be interested in the getApplicationNode prop`
      );
    }
  },
  /**
   * Buttons or other HTML to be rendered in the "actions" bar
   * at the bottom of the dialog.
   */
  actions: PropTypes.node,
  /**
   * Additional classes to be added to the actions container.
   */
  actionsClassName: PropTypes.string,
  /**
   * Aria label for the close button
   */
  ariaCloseLabel: PropTypes.string,
  /**
   * The modal's body content
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root dialog element.
   */
  className: PropTypes.string,
  /**
   * Size of the close button. See [Button component]({{root}}/components/button/#components.button.react)
   */
  closeButtonSize: PropTypes.oneOf(['small', 'big']),
  /**
   * Variation string to be applied to close button component. See [Button component]({{root}}/components/button/#components.button.react)
   */
  closeButtonVariation: PropTypes.string,
  /**
   * For internationalization purposes, the text for the "Close" button must be
   * passed in as a prop.
   */
  closeText: PropTypes.string,
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
   * Additional classes to be added to the header, which wraps the title and
   * close button.
   */
  headerClassName: PropTypes.string,
  /**
   * A method to handle the state change of exiting (or deactivating)
   * the modal. It will be invoked when the user presses Escape, or clicks outside
   * the dialog (if `underlayClickExits=true`).
   */
  onExit: PropTypes.func,
  size: PropTypes.oneOf(['narrow', 'wide', 'full']),
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
