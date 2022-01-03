import { EVENT_CATEGORY, MAX_LENGTH, sendLinkEvent } from '../analytics/SendAnalytics';
import AriaModal from 'react-aria-modal';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { dialogSendsAnalytics } from '../flags';
import { CloseIcon } from '../Icons';

export type DialogCloseButtonSize = 'small' | 'big';
export type DialogSize = 'narrow' | 'wide' | 'full';

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
   * Provide a **DOM node** which contains your page's content (which the modal should render
   * outside of). When the modal is open this node will receive `aria-hidden="true"`.
   * This can help screen readers understand what's going on.
   * Also see `getApplicationNode`.
   */
  applicationNode?: any;
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
   * The modal's body content
   */
  children: React.ReactNode;
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
  closeButtonVariation?: string;
  /**
   * The icon to display as part of the close button
   */
  closeIcon?: React.ReactNode;
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `closeButtonText`
   * @hide-prop The text for the "Close" button
   */
  closeText?: React.ReactNode;
  /**
   * Enable exiting the dialog when a user presses the Escape key.
   * [Read more on react-aria-modal docs.](https://github.com/davidtheclark/react-aria-modal#escapeexits)
   */
  escapeExits?: boolean;
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `escapeExits`.
   * @hide-prop Disable exiting the dialog when a user presses the Escape key.
   */
  escapeExitDisabled?: boolean;
  /**
   * Same as `applicationNode`, but a function that returns the node instead of
   * the node itself. The function will not be called until after the component
   * mounts, so it's safe to use browser globals and refer to DOM nodes within
   * it (e.g. `document.getElementById(..)`)
   */
  getApplicationNode?: (...args: any[]) => any;
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
   * Set focus to a specific element that should receive initial focus (if `focusDialog={false}`).
   * [Read more on react-aria-modal docs.](https://github.com/davidtheclark/react-aria-modal#initialfocus)
   */
  initialFocus?: string;
  /**
   * A method to handle the state change of exiting (or deactivating)
   * the modal. It will be invoked when the user presses Escape, or clicks outside
   * the dialog (if `underlayClickExits=true`).
   */
  onExit?: (...args: any[]) => any;
  size?: DialogSize;
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title?: React.ReactNode;
  /**
   * Enable exiting the dialog when a user clicks the underlay.
   */
  underlayClickExits?: boolean;
  /**
   * Allow additional AriaModal props to be passed to Dialog
   */
  // eslint-disable-next-line camelcase
  [additional_props: string]: unknown;
}

type OmitProps = 'size' | 'title';

export const Dialog = (props:DialogProps) :React.ReactNode => {
  
  let headingRef = useRef(null);
  let eventHeadingText = '';

  if (process.env.NODE_ENV !== 'production') {
    if (props.title) {
      console.warn(
          `[Deprecated]: Please remove the 'title' prop in <Dialog>, use 'heading' instead. This prop has been renamed and will be removed in a future release.`
          );
    }
    if (props.escapeExitDisabled) {
      console.warn(
          `[Deprecated]: Please remove the 'escapeExitDisabled' prop in <Dialog>, use 'escapeExits' instead. This prop has been renamed and will be removed in a future release.`
          );
    }
    if (props.closeText) {
      console.warn(
          `[Deprecated]: Please remove the 'closeText' prop in <Dialog>, use 'closeButtonText' instead. This prop has been renamed and will be removed in a future release.`
          );
    }
  }


  useEffect(() => {
    if (dialogSendsAnalytics() && props.analytics !== false) {
      const heading = props.title || props.heading;

      if (props.analyticsLabelOverride) {
        eventHeadingText = props.analyticsLabelOverride;
      } else if (typeof heading === 'string') {
        eventHeadingText = heading.substring(0, MAX_LENGTH);
      } else {
        eventHeadingText =
          headingRef && headingRef.current.textContent
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
    }
  },[])


    const {
      actions,
      actionsClassName,
      analytics,
      ariaCloseLabel,
      children,
      className,
      closeButtonSize,
      closeButtonText,
      closeButtonVariation,
      closeIcon,
      closeText,
      escapeExits,
      escapeExitDisabled,
      headerClassName,
      heading,
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
    // TODO: remove after deprecating 'escapeExitDiabled' prop
    const escapeExitsProp = escapeExitDisabled ? !escapeExitDisabled : escapeExits;

    /* eslint-disable jsx-a11y/no-redundant-roles */
    return (
      <AriaModal
        dialogClass={dialogClassNames}
        // TODO: remove 'escapeExits' after deprecating 'escapeExitDiabled' prop so that 'escapeExits' will pass via the 'modalProps' spread operator
        escapeExits={escapeExitsProp}
        focusDialog
        includeDefaultStyles={false}
        onExit={onExit}
        titleId="dialog-title dialog-content"
        underlayClass="ds-c-dialog-wrap"
        {...modalProps}
      >
        <div role="document">
          <header ref={(ref) => (headingRef = ref)} className={headerClassNames} role="banner">
            {
              // TODO: make heading required after removing title
              (title || heading) && (
                <h1 className="ds-h2" id="dialog-title">
                  {heading}
                </h1>
              )
            }
            <Button
              aria-label={ariaCloseLabel}
              className="ds-c-dialog__close"
              onClick={onExit}
              size={closeButtonSize}
              variation={closeButtonVariation}
            >
              {closeIcon}
              {
                // TODO: remove closeText support once fully deprecated
                closeText || closeButtonText
              }
            </Button>
          </header>
          <main role="main">
            <div id="dialog-content">{children}</div>
          </main>
          {actions && (
            <aside className={actionsClassNames} role="complementary">
              {actions}
            </aside>
          )}
        </div>
      </AriaModal>
    );
    /* eslint-enable jsx-a11y/no-redundant-roles */
}

Dialog.defaultProps = {
  ariaCloseLabel: 'Close modal dialog',
  closeButtonText: 'Close',
  closeButtonVariation: 'transparent',
  closeIcon: <CloseIcon />,
  escapeExits: true,
  escapeExitDisabled: false,
  underlayClickExits: false,
};

export default Dialog;
