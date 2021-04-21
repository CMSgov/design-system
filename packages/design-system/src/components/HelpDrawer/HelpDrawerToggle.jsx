import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * A link that triggers the visibility of a help drawer
 */
export class HelpDrawerToggle extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (!this.props.helpDrawerOpen && prevProps.helpDrawerOpen && this.buttonRef) {
      this.buttonRef.focus();
    }
  }

  render() {
    const { className, children, inline, showDrawer, helpDrawerOpen, ...others } = this.props;
    const classes = classNames(
      'ds-c-help-drawer__toggle',
      inline && 'ds-u-display--inline',
      className
    );

    return (
      <Button
        className={classes}
        inputRef={(el) => (this.buttonRef = el)}
        onClick={() => showDrawer()}
        variation="transparent"
        {...others}
      >
        {children}
      </Button>
    );
  }
}

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
