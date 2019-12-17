import PropTypes from 'prop-types';
import React from 'react';

/**
 * A link that triggers the visibility of a help drawer
 */
export class HelpDrawerToggle extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (!this.props.helpDrawerOpen && prevProps.helpDrawerOpen) {
      this.buttonRef.focus();
    }
  }

  render() {
    const blockInlineClass = `ds-u-display--${this.props.inline ? 'inline-block' : 'block'}`;
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
      // Use a <span> since a <div> may be invalid depending where this link is nested
      <span className={blockInlineClass}>
        <a
          href="javascript:void(0);"
          className={this.props.className}
          ref={el => (this.buttonRef = el)}
          onClick={() => this.props.showDrawer()}
        >
          {this.props.children}
        </a>
      </span>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
HelpDrawerToggle.propTypes = {
  /** Whether or not the Help Drawer controlled by this toggle is open or closed. This value is used to re-focus the toggle that opened the drawer when the drawer closes. */
  helpDrawerOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  /** Additional classes for the toggle button anchor element */
  className: PropTypes.string,
  /** Add display inline or block to parent span */
  inline: PropTypes.bool,
  /** This function is called with an id that the toggle generates. It can
   be used in implementing the help drawer for keeping track of the drawer the toggle controls */
  showDrawer: PropTypes.func.isRequired
};

export default HelpDrawerToggle;
