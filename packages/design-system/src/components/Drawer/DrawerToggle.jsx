import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * A link that triggers the visibility of a drawer
 */
class DrawerToggle extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (!this.props.drawerOpen && prevProps.drawerOpen && this.buttonRef) {
      this.buttonRef.focus();
    }
  }

  render() {
    const { className, children, inline, showDrawer, drawerOpen, ...others } = this.props;
    const classes = classNames(
      'ds-c-drawer__toggle',
      inline && 'ds-c-drawer__toggle--inline',
      className
    );

    return (
      <Button
        className={classes}
        inputRef={(el) => (this.buttonRef = el)}
        onClick={showDrawer}
        variation="transparent"
        {...others}
      >
        {children}
      </Button>
    );
  }
}

DrawerToggle.propTypes = {
  /**
   * Determines if Drawer is open or closed.
   * This value is used to re-focus the toggle that opened the drawer when the drawer closes.
   */
  drawerOpen: PropTypes.bool.isRequired,
  /**
   * DrawerToggle content.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes for the toggle button anchor element.
   */
  className: PropTypes.string,
  /**
   * Adds `display: inline` to the DrawerToggle.
   */
  inline: PropTypes.bool,
  /**
   * This function is called with an id that the toggle generates.
   * It can be used in implementing the Drawer for keeping track of which drawer the toggle controls.
   */
  showDrawer: PropTypes.func.isRequired,
};

export default DrawerToggle;
