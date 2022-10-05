import DrawerToggle, { DrawerToggleProps } from '../Drawer/DrawerToggle';
import classNames from 'classnames';

export type HelpDrawerToggleProps = Omit<DrawerToggleProps, 'drawerOpen'> & {
  /**
   * Whether or not the Help Drawer controlled by this toggle is open or closed.
   * This value is used to re-focus the toggle that opened the drawer when the drawer closes.
   */
  helpDrawerOpen: boolean;
  /**
   * Icon to be included at the end of the toggle's text
   */
  icon?: React.ReactNode;
};

/**
 * A link that triggers the visibility of a help drawer
 */

export const HelpDrawerToggle = ({
  children,
  className,
  showDrawer,
  helpDrawerOpen,
  icon,
  ...others
}: HelpDrawerToggleProps) => (
  <DrawerToggle
    className={classNames(className, 'ds-c-help-drawer__toggle')}
    drawerOpen={helpDrawerOpen}
    showDrawer={showDrawer}
    {...others}
  >
    {children} {icon}
  </DrawerToggle>
);

export default HelpDrawerToggle;
