import Button, { ButtonVariation } from '../Button/Button';
import NativeDialog from '../NativeDialog/NativeDialog';
import React, { useEffect } from 'react';
import classNames from 'classnames';
import useDialogAnalytics from './useDialogAnalytics';
import { CloseIcon } from '../Icons';
import { t } from '../i18n';

export type DialogCloseButtonSize = 'small' | 'big';
export type DialogSize = 'narrow' | 'wide' | 'full';

export interface DialogProps {
  /**
   * Buttons or other HTML to be rendered in the "actions" bar
   * at the bottom of the dialog.
   */
  actions?: React.ReactNode;
  /**
   * Additional classes to be added to the actions container.
   */
  actionsClassName?: string;
  /**
   * If `true`, the modal will receive a role of `alertdialog`, instead of its
   * default `dialog`. The `alertdialog` role should only be used when an
   * alert, error, or warning occurs.
   */
  alert?: boolean;
  /**
   * Analytics events tracking is enabled by default. Set this value to `false` to disable tracking for this component instance.
   */
  analytics?: boolean;
  /**
   * An override for the dynamic content sent to analytics services. By default this content comes from the heading.
   *
   * In cases where this component’s heading may contain **sensitive information**, use this prop to override what is sent to analytics.
   */
  analyticsLabelOverride?: string;
  /**
   * Aria label for the close button
   */
  ariaCloseLabel?: string;
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the root dialog element.
   */
  className?: string;
  /**
   * Size of the close button. See [Button component]({{root}}/components/button/#components.button.react)
   */
  closeButtonSize?: DialogCloseButtonSize;
  /**
   * For internationalization purposes, the text for the "Close" button must be
   * passed in as a prop.
   */
  closeButtonText?: React.ReactNode;
  /**
   * Variation string to be applied to close button component. See [Button component]({{root}}/components/button/#components.button.react)
   */
  closeButtonVariation?: ButtonVariation;
  /**
   * The icon to display as part of the close button
   */
  closeIcon?: React.ReactNode;
  /**
   * Additional classes to be added to the header, which wraps the heading and
   * close button.
   */
  headerClassName?: string;
  /**
   * The Dialog's heading, to be rendered in the header alongside the close button.
   */
  heading?: React.ReactNode;
  /**
   * This function is called after the modal opens
   */
  onEnter?(): void;
  /**
   * This function needs to handles the state change of exiting (or deactivating) the modal.
   * Maybe it's just a wrapper around `setState()`; or maybe you use some more involved
   * Flux-inspired state management — whatever the case, this module leaves the state
   * management up to you instead of making assumptions.
   * That also makes it easier to create your own "close modal" buttons; because you
   * have the function that closes the modal right there, written by you, at your disposal.
   */
  onExit?(event: React.MouseEvent | React.KeyboardEvent): void;
  /**
   * The Dialog's size parameter.
   */
  size?: DialogSize;
  /**
   * If true, the modal dialog will prevent any scrolling behind the modal window.
   */
  scrollDisabled?: boolean | undefined;
  /**
   * Apply a class to the underlay in order to custom-style it.
   * This module does apply various inline styles, though, so be aware that
   * overriding some styles might be difficult. If, for example, you want
   * to change the underlay's color, you should probably use the
   * `underlayColor` prop instead of a class.
   * If you would rather control all CSS, see `includeDefaultStyles`.
   */
  underlayClass?: string | undefined;
  /**
   * By default, a click on the underlay will exit the modal.
   * Pass `false`, and clicking on the underlay will do nothing.
   */
  underlayClickExits?: boolean | undefined;
  /**
   * By default, the Escape key exits the modal. Pass `false`, and it won't.
   */
  escapeExits?: boolean | undefined;
}

export const Dialog = (props: DialogProps) => {
  const {
    actions,
    actionsClassName,
    alert,
    analytics,
    analyticsLabelOverride,
    ariaCloseLabel,
    children,
    className,
    closeButtonSize,
    closeButtonText,
    closeButtonVariation,
    closeIcon,
    escapeExits,
    headerClassName,
    heading,
    onEnter,
    onExit,
    scrollDisabled,
    size,
    underlayClass,
    underlayClickExits,
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

  useEffect(() => {
    if (onEnter) onEnter();
  }, []);

  const headingRef = useDialogAnalytics(props);

  // TODO: We have to implement underlayClickExits=true ourselves. https://stackoverflow.com/a/26984690
  // Also, I checked, and some apps use it

  return (
    <NativeDialog className={dialogClassNames} showModal exit={onExit} {...modalProps}>
      <div role="document">
        <header className={headerClassNames} role="banner">
          {heading && (
            <h1 className="ds-h2" id="dialog-title" ref={headingRef}>
              {heading}
            </h1>
          )}
          <Button
            aria-label={ariaCloseLabel ?? t('dialog.ariaCloseLabel')}
            className="ds-c-dialog__close"
            onClick={onExit}
            size={closeButtonSize}
            variation={closeButtonVariation}
          >
            {closeIcon}
            {closeButtonText ?? t('dialog.closeButtonText')}
          </Button>
        </header>
        <main role="main" className="ds-c-dialog__body">
          <div id="dialog-content">{children}</div>
          {actions && <div className={actionsClassNames}>{actions}</div>}
        </main>
      </div>
    </NativeDialog>
  );
};

Dialog.defaultProps = {
  closeButtonVariation: 'transparent',
  closeIcon: <CloseIcon />,
  escapeExits: true,
  underlayClickExits: false,
};

export default Dialog;
