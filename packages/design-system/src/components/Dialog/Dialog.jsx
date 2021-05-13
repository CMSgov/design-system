import { EVENT_CATEGORY, MAX_LENGTH, sendAnalyticsEvent } from '../analytics/SendAnalytics';
import AriaModal from 'react-aria-modal';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

// Default analytics object
const defaultAnalytics = (heading = '') => ({
  onComponentDidMount: {
    event_name: 'modal_impression',
    event_type: EVENT_CATEGORY.uiInteraction,
    ga_eventAction: 'modal impression',
    ga_eventCategory: EVENT_CATEGORY.uiComponents,
    ga_eventLabel: heading,
    heading: heading,
  },
  onComponentWillUnmount: {
    event_name: 'modal_closed',
    event_type: EVENT_CATEGORY.uiInteraction,
    ga_eventAction: 'closed modal',
    ga_eventCategory: EVENT_CATEGORY.uiComponents,
    ga_eventLabel: heading,
    heading: heading,
  },
});

export class Dialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.headingRef = null;
    this.eventHeadingText = '';

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
  }

  componentDidMount() {
    const eventAction = 'onComponentDidMount';
    const eventHeading = this.props.title || this.props.heading;

    if (typeof eventHeading === 'string') {
      this.eventHeadingText = eventHeading.substring(0, MAX_LENGTH);
    } else {
      this.eventHeadingText =
        this.headingRef && this.headingRef.textContent
          ? this.headingRef.textContent.substring(0, MAX_LENGTH)
          : '';
    }

    /* Send analytics event for dialog open */
    sendAnalyticsEvent(
      get(this.props.analytics, eventAction),
      get(defaultAnalytics(this.eventHeadingText), eventAction)
    );
  }

  componentWillUnmount() {
    const eventAction = 'onComponentWillUnmount';
    /* Send analytics event for dialog close */
    sendAnalyticsEvent(
      get(this.props.analytics, eventAction),
      get(defaultAnalytics(this.eventHeadingText), eventAction)
    );
  }

  render() {
    const {
      actions,
      actionsClassName,
      ariaCloseLabel,
      children,
      className,
      closeButtonSize,
      closeButtonText,
      closeButtonVariation,
      closeText,
      escapeExits,
      escapeExitDisabled,
      headerClassName,
      heading,
      onExit,
      size,
      title,
      ...modalProps
    } = this.props;

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
          <header ref={(ref) => (this.headingRef = ref)} className={headerClassNames} role="banner">
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
}

Dialog.defaultProps = {
  ariaCloseLabel: 'Close modal dialog',
  closeButtonText: 'Close',
  closeButtonVariation: 'transparent',
  escapeExits: true,
  escapeExitDisabled: false,
  underlayClickExits: false,
};

/**
 * Defines the shape of an analytics event for tracking that is an object with key-value pairs
 */
const AnalyticsEventShape = PropTypes.shape({
  event_name: PropTypes.string,
  event_type: PropTypes.string,
  ga_eventAction: PropTypes.string,
  ga_eventCategory: PropTypes.string,
  ga_eventLabel: PropTypes.string,
  ga_eventType: PropTypes.string,
  ga_eventValue: PropTypes.string,
  heading: PropTypes.string,
});

// TODO: closeButtonText should be a string, but it is being used as a node in MCT,
// until we provide a better solution for customization, we type it as a node.
Dialog.propTypes = {
  /**
   * If `true`, the modal will receive a role of `alertdialog`, instead of its
   * default `dialog`. The `alertdialog` role should only be used when an
   * alert, error, or warning occurs.
   */
  alert: PropTypes.bool,
  /**
   * Analytics events tracking is enabled by default.
   * The `analytics` prop is an object of events that is either a nested `objects` with key-value
   * pairs, or `boolean` for disabling the event tracking. To disable an event tracking, set the
   * event object value to `false`.
   * When an event is triggered, the object value is populated and sent to google analytics
   * if `window.utag` instance is loaded.
   */
  analytics: PropTypes.shape({
    onComponentDidMount: PropTypes.oneOfType([PropTypes.bool, AnalyticsEventShape]),
    onComponentWillUnmount: PropTypes.oneOfType([PropTypes.bool, AnalyticsEventShape]),
  }),
  /**
   * Provide a **DOM node** which contains your page's content (which the modal should render
   * outside of). When the modal is open this node will receive `aria-hidden="true"`.
   * This can help screen readers understand what's going on.
   * Also see `getApplicationNode`.
   */
  applicationNode: function (props, propName, componentName) {
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
   * For internationalization purposes, the text for the "Close" button must be
   * passed in as a prop.
   */
  closeButtonText: PropTypes.node,
  /**
   * Variation string to be applied to close button component. See [Button component]({{root}}/components/button/#components.button.react)
   */
  closeButtonVariation: PropTypes.string,
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `closeButtonText`.
   * @hide-prop The text for the "Close" button
   */
  closeText: PropTypes.node,
  /**
   * Enable exiting the dialog when a user presses the Escape key.
   * [Read more on react-aria-modal docs.](https://github.com/davidtheclark/react-aria-modal#escapeexits)
   */
  escapeExits: PropTypes.bool,
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `escapeExits`.
   * @hide-prop Disable exiting the dialog when a user presses the Escape key.
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
   * Additional classes to be added to the header, which wraps the heading and
   * close button.
   */
  headerClassName: PropTypes.string,
  /**
   * The Dialog's heading, to be rendered in the header alongside the close button.
   */
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Set focus to a specific element that should receive initial focus (if `focusDialog={false}`).
   * [Read more on react-aria-modal docs.](https://github.com/davidtheclark/react-aria-modal#initialfocus)
   */
  initialFocus: PropTypes.string,
  /**
   * A method to handle the state change of exiting (or deactivating)
   * the modal. It will be invoked when the user presses Escape, or clicks outside
   * the dialog (if `underlayClickExits=true`).
   */
  onExit: PropTypes.func,
  size: PropTypes.oneOf(['narrow', 'wide', 'full']),
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Enable exiting the dialog when a user clicks the underlay.
   * [Read more on react-aria-modal docs.](https://github.com/davidtheclark/react-aria-modal#underlayclickexits)
   */
  underlayClickExits: PropTypes.bool,
};

export default Dialog;
