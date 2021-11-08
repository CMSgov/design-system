import { EVENT_CATEGORY, MAX_LENGTH, sendLinkEvent } from '../analytics/SendAnalytics';
import PropTypes from 'prop-types';
import React from 'react';
import SlidingPanel from '../SlidingPanel/SlidingPanel';
import { helpDrawerSendsAnalytics } from '../flags';
import classNames from 'classnames';

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
    if (helpDrawerSendsAnalytics() && this.props.analytics !== false) {
      const heading = this.props.title || this.props.heading;

      if (this.props.analyticsLabelOverride) {
        this.eventHeadingText = this.props.analyticsLabelOverride;
      } else if (typeof heading === 'string') {
        this.eventHeadingText = heading.substring(0, MAX_LENGTH);
      } else {
        this.eventHeadingText =
          this.headingRef && this.headingRef.textContent
            ? this.headingRef.textContent.substring(0, MAX_LENGTH)
            : '';
      }

      /* Send analytics event for helpdrawer open */
      sendLinkEvent({
        event_name: 'help_drawer_opened',
        event_type: EVENT_CATEGORY.uiInteraction,
        ga_eventAction: 'opened help drawer',
        ga_eventCategory: EVENT_CATEGORY.uiComponents,
        ga_eventLabel: this.eventHeadingText,
        heading: this.eventHeadingText,
      });
    }
  }

  componentWillUnmount() {
    if (helpDrawerSendsAnalytics() && this.props.analytics !== false) {
      /* Send analytics event for helpdrawer close */
      sendLinkEvent({
        event_name: 'help_drawer_closed',
        event_type: EVENT_CATEGORY.uiInteraction,
        ga_eventAction: 'closed help drawer',
        ga_eventCategory: EVENT_CATEGORY.uiComponents,
        ga_eventLabel: this.eventHeadingText,
        heading: this.eventHeadingText,
      });
    }
  }

  render() {
    const { children, className, title, ...others } = this.props;

    return (
      <SlidingPanel className={classNames(className, 'ds-c-help-drawer')} {...others}>
        {children}
      </SlidingPanel>
    );
  }
}

HelpDrawer.defaultProps = {
  ariaLabel: 'Close help drawer',
  closeButtonText: 'Close',
  headingLevel: '3',
};

// TODO: closeButtonText, title/heading should be a string, but it is being used as a node in MCT,
// until we provide a better solution for customization, we type it as a node.
HelpDrawer.propTypes = {
  /**
   * Analytics events tracking is enabled by default. Set this value to `false` to disable tracking for this component instance.
   */
  analytics: PropTypes.bool,
  /**
   * An override for the dynamic content sent to analytics services. By default this content comes from the heading.
   *
   * In cases where this component’s heading may contain **sensitive information**, use this prop to override what is sent to analytics.
   */
  analyticsLabelOverride: PropTypes.string,
  /**
   * @hide-prop Helps give more context to screen readers on the button that closes the Help Drawer
   */
  ariaLabel: PropTypes.string,
  /**
   * @hide-prop
   */
  closeButtonText: PropTypes.node,
  /**
   * @hide-prop
   */
  children: PropTypes.node.isRequired,
  /**
   * @hide-prop
   */
  className: PropTypes.string,
  /**
   * @hide-prop
   */
  footerBody: PropTypes.node,
  /**
   * @hide-prop
   */
  footerTitle: PropTypes.string,
  /**
   * @hide-prop Enables focus trap functionality within HelpDrawer.
   */
  hasFocusTrap: PropTypes.bool,
  /**
   * @hide-prop Text for the HelpDrawer title. Required because the `heading` will be focused on mount.
   */
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * @hide-prop A unique `id` to be used on heading element to label multiple instances of HelpDrawer.
   */
  headingId: PropTypes.string,
  /**
   * @hide-prop Heading type to override default `<h3>`
   */
  headingLevel: PropTypes.oneOf(['1', '2', '3', '4', '5']),
  /**
   * @hide-prop Enables "sticky" position of HelpDrawer header element.
   */
  isHeaderSticky: PropTypes.bool,
  /**
   * @hide-prop Enables "sticky" position of HelpDrawer footer element.
   */
  isFooterSticky: PropTypes.bool,
  /**
   * @hide-prop
   */
  onCloseClick: PropTypes.func.isRequired,
  /**
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default HelpDrawer;
