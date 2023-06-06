import React from 'react';
import Button, { ButtonVariation } from '../Button/Button';
import NativeDialog from '../NativeDialog/NativeDialog';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import useDialogAnalytics from './useDialogAnalytics';
import { CloseIcon } from '../Icons';
import { useEffect, useLayoutEffect, useRef, DialogHTMLAttributes } from 'react';
import { t } from '../i18n';
import { AnalyticsOverrideProps } from '../analytics';

export type DialogCloseButtonSize = 'small' | 'big';
export type DialogSize = 'narrow' | 'wide' | 'full';

export interface BaseDialogProps extends AnalyticsOverrideProps {
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
}

export type DialogProps = BaseDialogProps &
  Omit<DialogHTMLAttributes<HTMLElement>, keyof BaseDialogProps>;

export const Dialog = (props: DialogProps) => {
  const {
    actions,
    actionsClassName,
    alert,
    analytics,
    analyticsLabelOverride,
    analyticsEventTypeOverride,
    onAnalyticsEvent,
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
    size,
    ...modalProps
  } = props;

  const dialogClassNames = classNames('ds-c-dialog', className, size && `ds-c-dialog--${size}`);
  const headerClassNames = classNames('ds-c-dialog__header', headerClassName);
  const actionsClassNames = classNames('ds-c-dialog__actions', actionsClassName);

  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (onEnter) onEnter();
  }, []);

  // Set initial focus
  useEffect(() => {
    containerRef.current?.focus();
  }, [containerRef]);

  // Prevent scrolling the page behind the dialog. Needs to use useLayoutEffect
  // because we need to grab the window scroll position before the dialog renders
  // and messes it up.
  useLayoutEffect(() => {
    // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    const y = window.scrollY ?? 0;
    const bodyClass = 'ds--dialog-open';
    document.body.classList.add(bodyClass);
    document.body.style.setProperty('--body_top--dialog-open', `-${y}px`);
    return () => {
      document.body.classList.remove(bodyClass);
      window.scrollTo({ top: y, behavior: 'instant' });
    };
  }, []);

  const headingRef = useDialogAnalytics(props);
  const headingId = useRef(uniqueId('dialog-title_')).current;

  return (
    <NativeDialog className={dialogClassNames} showModal exit={onExit} {...modalProps}>
      <div role="document" ref={containerRef} tabIndex={-1} aria-labelledby={headingId}>
        <header className={headerClassNames}>
          {heading && (
            <h1 className="ds-h2" id={headingId} ref={headingRef}>
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
};

export default Dialog;
