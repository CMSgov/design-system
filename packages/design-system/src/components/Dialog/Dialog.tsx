import React from 'react';
import Button, { ButtonVariation } from '../Button/Button';
import NativeDialog from '../NativeDialog/NativeDialog';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import useDialogAnalytics from './useDialogAnalytics';
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

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/modal-dialog/).
 */
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
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
    return () => {
      document.body.classList.remove(bodyClass);
      window.scrollTo({ top: y, behavior: 'auto' });
      document.documentElement.style.removeProperty('scroll-behavior');
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
  closeIcon: (
    <svg
      aria-hidden="true"
      className="ds-c-icon ds-c-icon--close "
      id="icon-12"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.647 11.213c.235.235.353.521.353.858 0 .337-.118.624-.353.859l-1.717 1.717a1.17 1.17 0 01-.86.354c-.336 0-.622-.118-.857-.354l-3.714-3.712-3.712 3.712A1.166 1.166 0 012.93 15c-.337 0-.622-.118-.859-.354L.353 12.93A1.165 1.165 0 010 12.07c0-.337.117-.623.353-.858L4.065 7.5.353 3.789A1.168 1.168 0 010 2.929c0-.336.117-.622.353-.857L2.07.353C2.307.118 2.592 0 2.93 0c.337 0 .623.118.858.353L7.5 4.065 11.213.353c.235-.235.521-.353.857-.353.337 0 .623.118.86.353l1.717 1.719c.235.235.353.521.353.857 0 .338-.118.623-.353.86L10.935 7.5l3.712 3.712z"
        fill-rule="evenodd"
      ></path>
    </svg>
  ),
};

export default Dialog;
