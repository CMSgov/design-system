import Button, { ButtonVariation } from '../Button/Button';
import NativeDialog from '../NativeDialog/NativeDialog';
import React, { useEffect, useLayoutEffect } from 'react';
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
  /**
   * Pass `true` to have the dialog close when its backdrop pseudo-element is clicked
   */
  backdropClickExits?: boolean;
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
   * A custom `id` attribute for the dialog element
   */
  id?: string;
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
  onExit(event: React.MouseEvent | React.KeyboardEvent): void;
  /**
   * The Dialog's size parameter.
   */
  size?: DialogSize;
  /**
   * If true, the modal dialog will prevent any scrolling behind the modal window.
   */
  scrollDisabled?: boolean | undefined;
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
    headerClassName,
    heading,
    onEnter,
    onExit,
    scrollDisabled,
    size,
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

  // Prevent scrolling the page behind the dialog. Needs to use useLayoutEffect
  // because we need to grab the window scroll position before the dialog renders
  // and messes it up.
  useLayoutEffect(() => {
    if (!scrollDisabled) return;

    // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    const y = window.scrollY ?? 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, y);
    };
  }, [scrollDisabled]);

  const headingRef = useDialogAnalytics(props);

  return (
    <NativeDialog className={dialogClassNames} showModal exit={onExit} {...modalProps}>
      <div role="document">
        <header className={headerClassNames}>
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
  closeButtonVariation: 'ghost',
  closeIcon: <CloseIcon />,
  scrollDisabled: true,
};

export default Dialog;
