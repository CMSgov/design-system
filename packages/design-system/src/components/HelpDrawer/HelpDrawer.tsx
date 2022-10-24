import Drawer, { DrawerProps } from '../Drawer/Drawer';
import classNames from 'classnames';
import useHelpDrawerAnalytics from './useHelpDrawerAnalytics';
import { AnalyticsFunction } from '../analytics';

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
   * Optional callback that will intercept analytics events for this component.
   * If none is specified, the design system will use the default analytics
   * function, which can be overwritten globally with `setDefaultAnalyticsFunction`.
   */
  onAnalyticsEvent?: AnalyticsFunction;
}

export const HelpDrawer = (props: HelpDrawerProps) => {
  const { analytics, analyticsLabelOverride, children, className, ...others } = props;
  const headingRef = useHelpDrawerAnalytics(props);

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
