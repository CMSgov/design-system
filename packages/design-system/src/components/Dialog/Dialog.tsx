import { EVENT_CATEGORY, MAX_LENGTH, sendLinkEvent } from '../analytics/SendAnalytics';
import Button, { ButtonVariation } from '../Button/Button';
import React, { forwardRef, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { dialogSendsAnalytics } from '../flags';
import { CloseIcon } from '../Icons';

export type DialogCloseButtonSize = 'small' | 'big';
export type DialogSize = 'narrow' | 'wide' | 'full';
export type DialogType = 'modal' | 'drawer';

export interface DialogProps {
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
   * Buttons or other HTML to be rendered in the "actions" bar
   * at the bottom of the dialog.
   */
  actions?: React.ReactNode;
  /**
   * Additional classes to be added to the actions container.
   */
  actionsClassName?: string;
  /**
   * Aria label for the close button
   */
  ariaCloseLabel?: string;
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
  children: React.ReactNode;
  /**
   * Additional classes to be added to the header, which wraps the heading and
   * close button.
   */
  headerClassName?: string;
  /**
   * The Dialog's heading, to be rendered in the header alongside the close button.
   */
  heading: React.ReactNode;
  open: boolean;
  onExit: () => void;
  /**
   * The Dialog's size parameter.
   */
  size?: DialogSize;
  type?: DialogType;
}

export const Dialog = (props: DialogProps) => {
  const {
    actions,
    actionsClassName,
    ariaCloseLabel,
    children,
    className,
    closeButtonSize,
    closeButtonText,
    closeButtonVariation,
    closeIcon,
    headerClassName,
    heading,
    open,
    onExit,
    size,
    type,
    ...modalProps
  } = props;

  // Analytics
  const headingRef = useRef(null);
  let eventHeadingText = '';
  useEffect(() => {
    if (dialogSendsAnalytics() && props.analytics !== false) {
      const heading = props.heading;

      if (props.analyticsLabelOverride) {
        eventHeadingText = props.analyticsLabelOverride;
      } else if (typeof heading === 'string') {
        eventHeadingText = heading.substring(0, MAX_LENGTH);
      } else {
        eventHeadingText = headingRef.current?.textContent
          ? headingRef.current.textContent.substring(0, MAX_LENGTH)
          : '';
      }

      /* Send analytics event for dialog open */
      sendLinkEvent({
        event_name: 'modal_impression',
        event_type: EVENT_CATEGORY.uiInteraction,
        ga_eventAction: 'modal impression',
        ga_eventCategory: EVENT_CATEGORY.uiComponents,
        ga_eventLabel: eventHeadingText,
        heading: eventHeadingText,
      });
    }

    return () => {
      if (dialogSendsAnalytics() && props.analytics !== false) {
        /* Send analytics event for dialog close */
        sendLinkEvent({
          event_name: 'modal_closed',
          event_type: EVENT_CATEGORY.uiInteraction,
          ga_eventAction: 'closed modal',
          ga_eventCategory: EVENT_CATEGORY.uiComponents,
          ga_eventLabel: eventHeadingText,
          heading: eventHeadingText,
        });
      }
    };
  }, []);

  // Toggle dialog open
  const dialogRef = useRef(null);
  useEffect(() => {
    if (open && type === 'modal') {
      dialogRef.current?.showModal();
    } else if (open && type !== 'modal') {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
    }
  }, [open, type]);

  const modalClassNames = classNames('ds-c-dialog', className);
  const drawerClassNames = classNames('ds-c-drawer', className);

  let dialogClassNames = null;

  if (type === 'modal') {
    dialogClassNames = modalClassNames;
  } else if (type === 'drawer') {
    dialogClassNames = drawerClassNames;
  }

  const headerClassNames = classNames('ds-c-dialog__header', headerClassName);
  const actionsClassNames = classNames('ds-c-dialog__actions', actionsClassName);

  // PE: Implement `onCancel={onExit}` for `dialog`
  // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncancel
  // onCancel allows close/open of dialog using keyboard - state doesn't get tripped up
  // Receiving TS error saying `onCancel` doesn't exist on HTMLDialogElement
  return (
    <dialog ref={dialogRef} className={dialogClassNames} onCancel={onExit} {...modalProps}>
      <header role="banner" className={headerClassNames}>
        {heading && (
          // 👀 Check into how `h1` behaves with AT
          <h1 className="ds-h2">{heading}</h1>
        )}
        <Button
          aria-label={ariaCloseLabel}
          className="ds-c-dialog__close"
          onClick={onExit}
          size={closeButtonSize}
          variation={closeButtonVariation}
        >
          {closeIcon}
          {closeButtonText}
        </Button>
      </header>
      <main role="main" className="ds-c-dialog__body">
        <div>{children}</div>
        {actions && <div className={actionsClassNames}>{actions}</div>}
      </main>
    </dialog>
  );
};

Dialog.defaultProps = {
  ariaCloseLabel: 'Close modal dialog',
  closeButtonText: 'Close',
  closeButtonVariation: 'transparent',
  closeIcon: <CloseIcon />,
};

export default Dialog;
