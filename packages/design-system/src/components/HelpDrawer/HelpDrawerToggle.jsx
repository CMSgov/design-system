import PropTypes from 'prop-types';
import React from 'react';
import DrawerToggle from '../Drawer/DrawerToggle';
import classNames from 'classnames';

/**
 * A link that triggers the visibility of a help drawer
 */

const HelpDrawerToggle = function (props) {
  const { children, className, showDrawer, helpDrawerOpen, icon, ...others } = props;

  return (
    <DrawerToggle
      className={classNames(className, 'ds-c-help-drawer__toggle')}
      drawerOpen={helpDrawerOpen}
      showDrawer={showDrawer}
      {...others}
    >
      {children} {icon}
    </DrawerToggle>
  );
};

HelpDrawerToggle.propTypes = {
  /**
   * Whether or not the Help Drawer controlled by this toggle is open or closed.
   * This value is used to re-focus the toggle that opened the drawer when the drawer closes.
   */
  helpDrawerOpen: PropTypes.bool.isRequired,
  /**
   * The HelpDrawerToggle content
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes for the toggle button anchor element.
   */
  className: PropTypes.string,
  /**
   * icon to be included at the end of the toggle's text
   */
  icon: PropTypes.node,
  /**
   * Adds `display: inline` to the HelpDrawerToggle.
   */
  inline: PropTypes.bool,
  /**
   * This function is called with an id that the toggle generates.
   * It can be used in implementing the help drawer for keeping track of the drawer the toggle controls
   */
  showDrawer: PropTypes.func.isRequired,
};

export default HelpDrawerToggle;
