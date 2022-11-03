import Drawer, { DrawerProps } from '../Drawer/Drawer';
import classNames from 'classnames';
import useHelpDrawerAnalytics from './useHelpDrawerAnalytics';
import { AnalyticsOverrideProps } from '../analytics';

export interface HelpDrawerProps extends DrawerProps, AnalyticsOverrideProps {}

export const HelpDrawer = (props: HelpDrawerProps) => {
  const {
    analytics,
    analyticsLabelOverride,
    analyticsEventTypeOverride,
    children,
    className,
    ...others
  } = props;
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
