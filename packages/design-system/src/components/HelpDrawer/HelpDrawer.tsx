import { EVENT_CATEGORY, MAX_LENGTH, sendLinkEvent } from '../analytics';
import React from 'react';
import Drawer, { DrawerProps } from '../Drawer/Drawer';
import { helpDrawerSendsAnalytics } from '../flags';
import classNames from 'classnames';

export interface HelpDrawerProps extends DrawerProps {
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
   * @hide-prop [Deprecated] This prop has been renamed to `heading`.
   */
  title?: string | React.ReactNode;
}

export class HelpDrawer extends React.PureComponent<HelpDrawerProps> {
  constructor(props: HelpDrawerProps) {
    super(props);
    this.headingRef = null;
    this.eventHeadingText = '';

    if (process.env.NODE_ENV !== 'production') {
      if (this.props.title) {
        console.warn(
          `[Deprecated]: Please remove the 'title' prop in <HelpDrawer>, use 'heading' instead. This prop has been renamed and will be removed in a future release.`
        );
      }
      if (!this.props.title && !this.props.heading) {
        console.warn(
          `The 'heading' prop in <HelpDrawer> is required. The 'title' prop has been renamed to 'heading' and will be removed in a future release.`
        );
      }
    }
  }

  componentDidMount(): void {
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

  componentWillUnmount(): void {
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

  headingRef: any;
  eventHeadingText: string;

  render(): JSX.Element {
    const { children, className, ...others } = this.props;

    return (
      <Drawer className={classNames(className, 'ds-c-help-drawer')} {...others}>
        {children}
      </Drawer>
    );
  }
}

export default HelpDrawer;
