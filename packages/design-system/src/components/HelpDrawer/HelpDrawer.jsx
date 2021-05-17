import { EVENT_CATEGORY, MAX_LENGTH, sendAnalyticsEvent } from '../analytics/SendAnalytics';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

// Default analytics object
const defaultAnalytics = (heading = '') => ({
  onComponentDidMount: {
    event_name: 'help_drawer_opened',
    event_type: EVENT_CATEGORY.uiInteraction,
    ga_eventAction: 'opened help drawer',
    ga_eventCategory: EVENT_CATEGORY.uiComponents,
    ga_eventLabel: heading,
    heading: heading,
  },
  onComponentWillUnmount: {
    event_name: 'help_drawer_closed',
    event_type: EVENT_CATEGORY.uiInteraction,
    ga_eventAction: 'closed help drawer',
    ga_eventCategory: EVENT_CATEGORY.uiComponents,
    ga_eventLabel: heading,
    heading: heading,
  },
});

export class HelpDrawer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.headingRef = null;
    this.eventHeadingText = '';

    if (process.env.NODE_ENV !== 'production') {
      if (props.title) {
        console.warn(
          `[Deprecated]: Please remove the 'title' prop in <HelpDrawer>, use 'heading' instead. This prop has been renamed and will be removed in a future release.`
        );
      }
      if (!props.title && !props.heading) {
        console.warn(
          `The 'heading' prop in <HelpDrawer> is required. The 'title' prop has been renamed to 'heading' and will be removed in a future release.`
        );
      }
    }
  }

  componentDidMount() {
    if (this.headingRef) this.headingRef.focus();

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

    /* Send analytics event for helpdrawer open */
    sendAnalyticsEvent(
      get(this.props.analytics, eventAction),
      get(defaultAnalytics(this.eventHeadingText), eventAction)
    );
  }

  componentWillUnmount() {
    const eventAction = 'onComponentWillUnmount';
    /* Send analytics event for helpdrawer close */
    sendAnalyticsEvent(
      get(this.props.analytics, eventAction),
      get(defaultAnalytics(this.eventHeadingText), eventAction)
    );
  }

  render() {
    const {
      ariaLabel,
      className,
      closeButtonText,
      children,
      footerBody,
      footerTitle,
      heading,
      onCloseClick,
      title,
    } = this.props;
    const Heading = `h${this.props.headingLevel}` || `h3`;

    /* eslint-disable jsx-a11y/no-noninteractive-tabindex, react/no-danger */
    return (
      <div className={classNames(className, 'ds-c-help-drawer')}>
        <div className="ds-c-help-drawer__header">
          {/* The nested div below might seem redundant, but we need a
           * separation between our sticky header, and the flex container
           * so things display as expected when the body content overflows
           */}
          <div className="ds-u-fill--gray-lightest ds-u-padding--2 ds-u-display--flex ds-u-align-items--start">
            <Heading
              ref={(el) => (this.headingRef = el)}
              tabIndex="0"
              className="ds-u-text--lead ds-u-margin-y--0 ds-u-margin-right--2"
            >
              {
                // TODO: make heading required after removing title
                title || heading
              }
            </Heading>
            <Button
              aria-label={ariaLabel}
              className="ds-u-margin-left--auto ds-c-help-drawer__close-button"
              size="small"
              onClick={onCloseClick}
            >
              {closeButtonText}
            </Button>
          </div>
        </div>
        <div className="ds-c-help-drawer__body">
          <div className="ds-c-help-drawer__content ds-u-md-font-size--small ds-u-lg-font-size--base ds-u-padding--2">
            {children}
          </div>
          <div className="ds-c-help-drawer__footer ds-u-fill--primary-alt-lightest ds-u-md-font-size--small ds-u-lg-font-size--base ds-u-padding--2">
            <h4 className="ds-text ds-u-margin--0">{footerTitle}</h4>
            <div className="ds-text ds-u-margin--0">{footerBody}</div>
          </div>
        </div>
      </div>
    );
  }
}

HelpDrawer.defaultProps = {
  ariaLabel: 'Close help drawer',
  closeButtonText: 'Close',
  headingLevel: '3',
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

// TODO: closeButtonText, title/heading should be a string, but it is being used as a node in MCT,
// until we provide a better solution for customization, we type it as a node.
HelpDrawer.propTypes = {
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
   * Helps give more context to screen readers on the button that closes the Help Drawer
   */
  ariaLabel: PropTypes.string,
  closeButtonText: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  footerBody: PropTypes.node,
  footerTitle: PropTypes.string,
  /**
   * Text for the HelpDrawer title. Required because the `heading` will be focused on mount.
   */
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel: PropTypes.oneOf(['1', '2', '3', '4', '5']),
  onCloseClick: PropTypes.func.isRequired,
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default HelpDrawer;
