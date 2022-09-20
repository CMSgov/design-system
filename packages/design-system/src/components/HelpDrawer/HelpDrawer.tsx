import { EventCategory, MAX_LENGTH, sendLinkEvent } from '../analytics';
import React, { useEffect, useRef } from 'react';
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

export const HelpDrawer = (props: HelpDrawerProps) => {
  const { analytics, analyticsLabelOverride, children, className, ...others } = props;
  const headingRef = useRef<any>();

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

  useEffect(() => {
    if (!helpDrawerSendsAnalytics() || analytics === false) {
      return;
    }

    const eventHeadingText =
      props.analyticsLabelOverride ??
      headingRef.current?.textContent?.substring(0, MAX_LENGTH) ??
      '';

    // Send analytics event for helpdrawer open
    sendLinkEvent({
      event_name: 'help_drawer_opened',
      event_type: EventCategory.UI_INTERACTION,
      ga_eventAction: 'opened help drawer',
      ga_eventCategory: EventCategory.UI_COMPONENTS,
      ga_eventLabel: eventHeadingText,
      heading: eventHeadingText,
    });

    return () => {
      // Send analytics event for helpdrawer close
      sendLinkEvent({
        event_name: 'help_drawer_closed',
        event_type: EventCategory.UI_INTERACTION,
        ga_eventAction: 'closed help drawer',
        ga_eventCategory: EventCategory.UI_COMPONENTS,
        ga_eventLabel: eventHeadingText,
        heading: eventHeadingText,
      });
    };
  }, []);

  return (
    <Drawer
      className={classNames(className, 'ds-c-help-drawer')}
      headingRef={headingRef}
      {...others}
    >
      {children}
    </Drawer>
  );
};

export default HelpDrawer;
