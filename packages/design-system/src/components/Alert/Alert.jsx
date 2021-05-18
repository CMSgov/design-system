import { EVENT_CATEGORY, MAX_LENGTH, sendAnalyticsEvent } from '../analytics/SendAnalytics';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import uniqueId from 'lodash.uniqueid';

// Default analytics object
const defaultAnalytics = (heading = '', variation = '') => ({
  onComponentDidMount: {
    event_name: 'alert_impression',
    event_type: EVENT_CATEGORY.uiInteraction,
    ga_eventAction: 'alert impression',
    ga_eventCategory: EVENT_CATEGORY.uiComponents,
    ga_eventLabel: heading,
    heading: heading,
    type: variation,
  },
});

export class Alert extends React.PureComponent {
  constructor(props) {
    super(props);
    this.alertRef = null;
    this.headingId = props.headingId || uniqueId('alert_');
    this.eventHeadingText = '';
    if (process.env.NODE_ENV !== 'production') {
      if (!props.heading && !props.children) {
        console.warn(
          `Empty <Alert> components are not allowed, please use the 'heading' prop or include children.`
        );
      }
    }
  }

  componentDidMount() {
    const eventAction = 'onComponentDidMount';
    const eventHeading = this.props.heading || this.props.children;

    /* Send analytics event for `error`, `warn`, `success` alert variations */
    if (this.props.variation) {
      if (typeof eventHeading === 'string') {
        this.eventHeadingText = eventHeading.substring(0, MAX_LENGTH);
      } else {
        const eventHeadingTextElement =
          (this.alertRef && this.alertRef.getElementsByClassName('ds-c-alert__heading')[0]) ||
          (this.alertRef && this.alertRef.getElementsByClassName('ds-c-alert__body')[0]);
        this.eventHeadingText =
          eventHeadingTextElement && eventHeadingTextElement.textContent
            ? eventHeadingTextElement.textContent.substring(0, MAX_LENGTH)
            : '';
      }

      sendAnalyticsEvent(
        get(this.props.analytics, eventAction),
        get(defaultAnalytics(this.eventHeadingText, this.props.variation), eventAction)
      );
    }
  }

  heading() {
    const Heading = `h${this.props.headingLevel}` || `h2`;
    if (this.props.heading) {
      return (
        <Heading className="ds-c-alert__heading" id={this.headingId}>
          {this.props.heading}
        </Heading>
      );
    }
  }

  render() {
    const classes = classNames(
      'ds-c-alert',
      this.props.hideIcon && 'ds-c-alert--hide-icon',
      this.props.variation && `ds-c-alert--${this.props.variation}`,
      this.props.className
    );

    return (
      <div
        className={classes}
        role={this.props.role}
        aria-labelledby={this.props.heading ? this.headingId : undefined}
        ref={(ref) => (this.alertRef = ref)}
      >
        <div className="ds-c-alert__body">
          {this.heading()}
          {this.props.children}
        </div>
      </div>
    );
  }
}

Alert.defaultProps = {
  role: 'region',
  headingLevel: '2',
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
  type: PropTypes.string,
});

Alert.propTypes = {
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
  }),
  /**
   * The alert's body content
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Text for the alert heading
   */
  heading: PropTypes.string,
  /**
   * Optional id used to link the `aria-labelledby` attribute to the heading. If not provided, a unique id will be automatically generated and used.
   */
  headingId: PropTypes.string,
  /**
   * Heading type to override default `<h3>`.
   */
  headingLevel: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  /**
   * Boolean to hide the `Alert` icon
   */
  hideIcon: PropTypes.bool,
  /**
   * ARIA `role`, defaults to 'region'
   */
  role: PropTypes.oneOf(['alert', 'alertdialog', 'region', 'status']),
  /**
   * A string corresponding to the `Alert` variation classes (`error`, `warn`, `success`)
   */
  variation: PropTypes.oneOf(['error', 'warn', 'success']),
};

export default Alert;
