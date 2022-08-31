import { EventCategory, sendLinkEvent, useAnalyticsContent } from '../analytics';
import AriaModal from 'react-aria-modal';
import Button, { ButtonVariation } from '../Button/Button';
import React from 'react';
import classNames from 'classnames';
import { dialogSendsAnalytics } from '../flags';
import { CloseIcon } from '../Icons';
import { t } from '../i18n';

export type DialogCloseButtonSize = 'small' | 'big';
export type DialogSize = 'narrow' | 'wide' | 'full';

export interface AriaModalProps {
  /**
   * If true, the modal will receive a role of alertdialog,
   * instead of its default dialog.
   */
  alert?: boolean | undefined;

  children?: React.ReactNode;

  /**
   * By default, the modal is active when mounted, deactivated when unmounted.
   * However, you can also control its active/inactive state by changing
   * its mounted property instead.
   */
  mounted?: boolean | undefined;

  /**
   * Provide your main application node here (which the modal should
   * render outside of), and when the modal is open this application
   * node will receive the attribute `aria-hidden="true"`.
   * This can help screen readers understand what's going on.
   */
  applicationNode?: Node | Element | undefined;

  /**
   * Same as `applicationNode`, but a function that returns the node
   * instead of the node itself. This can be useful or necessary in
   * a variety of situations, one of which is server-side React
   * rendering. The function will not be called until after the
   * component mounts, so it is safe to use browser globals
   * and refer to DOM nodes within it (e.g. `document.getElementById(..)`),
   * without ruining your server-side rendering.
   */
  getApplicationNode?(): Node | Element | null | undefined;

  /**
   * By default, styles are applied inline to the dialog and underlay
   * portions of the component. However, you can disable all inline
   * styles by setting `includeDefaultStyles` to false. If set, you
   * must specify all styles externally, including positioning.
   * This is helpful if your project uses external CSS assets.
   *
   * _Note_: underlayStyle and dialogStyle can still be set inline,
   * but these will be the only styles applied.
   */
  includeDefaultStyles?: boolean | undefined;

  /**
   * Apply a class to the dialog in order to custom-style it.
   *
   * Be aware that, _by default_, this module does apply various
   * inline styles to the dialog element in order position it.
   * To disable _all inline styles_, see `includeDefaultStyles`.
   */
  dialogClass?: string | undefined;

  /**
   * Choose your own id attribute for the dialog element.
   *
   * Default: `react-aria-modal-dialog`.
   */
  dialogId?: string | undefined;

  /**
   * Customize properties of the style prop that is passed to the dialog.
   */
  dialogStyle?: React.CSSProperties | undefined;

  /**
   * By default, when the modal activates its first focusable child will
   * receive focus. However, if `focusDialog` is true, the dialog itself
   * will receive initial focus — and that focus will be hidden.
   * (This is essentially what Bootstrap does with their modal.)
   */
  focusDialog?: boolean | undefined;

  /**
   * By default, when the modal activates its first focusable child will
   * receive focus. If, instead, you want to identify a specific element
   * that should receive initial focus, pass a selector string to this
   * prop. (That selector is passed to `document.querySelector()` to find
   * the DOM node.)
   */
  initialFocus?: string | undefined;

  /**
   * A string to use as the modal's accessible title. This value is passed
   * to the modal's `aria-label` attribute. You must use either `titleId` or
   * `titleText`, but not both.
   */
  titleText?: string | undefined;

  /**
   * The `id` of the element that should be used as the modal's accessible
   * title. This value is passed to the modal's `aria-labelledby` attribute.
   * You must use either `titleId` or `titleText`, but not both.
   */
  titleId?: string | undefined;

  /**
   * Customize properties of the `style` prop that is passed to the underlay.
   * The best way to add some vertical displacement to the dialog is to add
   * top & bottom padding to the underlay.
   * This is illustrated in the demo examples.
   */
  underlayStyle?: React.CSSProperties | undefined;

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

  /**
   * If you want to change the underlay's color, you can
   * do that with this prop. If `false`, no background color will be
   * applied with inline styles. Presumably you will apply then
   * yourself via an `underlayClass`.
   *
   * Default: rgba(0,0,0,0.5)
   */
  underlayColor?: string | false | undefined;

  /**
   * If `true`, the modal's contents will be vertically (as well as horizontally) centered.
   */
  verticallyCenter?: boolean | undefined;

  /**
   * This function is called in the modal's `componentDidMount()` lifecycle method.
   * You can use it to do whatever diverse and sundry things you feel like
   * doing after the modal activates.
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
   * If true, the modal dialog's focus trap will be paused.
   * You won't typically need to use this prop. It used to be that the typical reason for pausing a focus trap was to enable nested focus traps;
   * but as of focus-trap v4, the pausing and unpausing of hierachical traps is handled automatically.
   */
  focusTrapPaused?: boolean | undefined;

  /**
   * Customize properties of the focusTrapOptions prop that is passed to the modal dialog's focus trap.
   * For example, you can use this prop if you need better control of where focus is returned.
   */
  focusTrapOptions?: Record<string, unknown> | undefined;

  /**
   * If true, the modal dialog will prevent any scrolling behind the modal window.
   */
  scrollDisabled?: boolean | undefined;
}

export interface DialogProps extends AriaModalProps {
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
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `closeButtonText`
   * @hide-prop The text for the "Close" button
   */
  closeText?: React.ReactNode;
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `escapeExits`.
   * @hide-prop Disable exiting the dialog when a user presses the Escape key.
   */
  escapeExitDisabled?: boolean;
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
   * The Dialog's size parameter.
   */
  size?: DialogSize;
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title?: React.ReactNode;
  /**
   * Allow additional AriaModal props to be passed to Dialog
   */
  additional_props?: AriaModalProps;
}

export const Dialog = (props: DialogProps) => {
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

  const {
    actions,
    actionsClassName,
    analytics,
    analyticsLabelOverride,
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

  function sendDialogEvent(
    content: string | undefined,
    eventAttributes: { event_name: string; ga_eventAction: string }
  ) {
    if (!dialogSendsAnalytics() || analytics === false) {
      return;
    }

    const eventHeadingText = analyticsLabelOverride ?? content;

    if (!eventHeadingText) {
      console.error('No content found for Dialog analytics event');
      return;
    }

    sendLinkEvent({
      event_type: EventCategory.UI_INTERACTION,
      ga_eventCategory: EventCategory.UI_COMPONENTS,
      ga_eventLabel: eventHeadingText,
      heading: eventHeadingText,
      ...eventAttributes,
    });
  }

  const [headingRef] = useAnalyticsContent({
    componentName: 'Dialog',
    onMount: (content: string | undefined) => {
      sendDialogEvent(content, {
        event_name: 'modal_impression',
        ga_eventAction: 'modal impression',
      });
    },
    onUnmount: (content: string | undefined) => {
      sendDialogEvent(content, {
        event_name: 'modal_closed',
        ga_eventAction: 'closed modal',
      });
    },
  });

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
        <header className={headerClassNames}>
          {
            // TODO: make heading required after removing title
            (title || heading) && (
              <h1 className="ds-h2" id="dialog-title" ref={headingRef}>
                {heading}
              </h1>
            )
          }
          <Button
            aria-label={ariaCloseLabel ?? t('dialog.ariaCloseLabel')}
            className="ds-c-dialog__close"
            onClick={onExit}
            size={closeButtonSize}
            variation={closeButtonVariation}
          >
            {closeIcon}
            {
              // TODO: remove closeText support once fully deprecated
              closeText ?? closeButtonText ?? t('dialog.closeButtonText')
            }
          </Button>
        </header>
        <main role="main" className="ds-c-dialog__body">
          <div id="dialog-content">{children}</div>

          {actions && <div className={actionsClassNames}>{actions}</div>}
        </main>
      </div>
    </AriaModal>
  );
};

Dialog.defaultProps = {
  closeButtonVariation: 'ghost',
  closeIcon: <CloseIcon />,
  escapeExits: true,
  escapeExitDisabled: false,
  underlayClickExits: false,
};

export default Dialog;
