import PropTypes from 'prop-types';
import React from 'react';
import uniqueId from 'lodash/uniqueId';

/**
 * A link that triggers the visibility of a help drawer
 */
export class HelpDrawerToggle extends React.PureComponent {
  constructor(props) {
    super(props);
    // Use a unique ID to avoid scenarios where multiple toggles on the same
    // page trigger the same help drawer, which could result in multiple instances
    // of the drawer being rendered if these weren't unique:
    this.id = uniqueId('helpDrawer');
  }

  componentWillUpdate(nextProps) {
    if (
      this.props.activeHelpDrawer &&
      this.props.activeHelpDrawer === this.id &&
      !nextProps.activeHelpDrawer
    ) {
      // Return focus when help drawer triggered by this toggle has become hidden
      this.buttonRef.focus();
    }
  }

  handleToggleClick() {
    this.props.showDrawer(this.id);
  }

  render() {
    const blockInlineClass = `ds-u-display--${
      this.props.inline ? 'inline-block' : 'block'
    }`;
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
      // Use a <span> since a <div> may be invalid depending where this link is nested
      <span className={blockInlineClass}>
        <a
          href="javascript:void(0);"
          className={this.props.className}
          ref={el => (this.buttonRef = el)}
          onClick={() => this.handleToggleClick()}
        >
          {this.props.children}
        </a>
      </span>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
HelpDrawerToggle.propTypes = {
  /** This is an id that, if set and implemented in the Help Drawer, is used to re-focus the toggle that opened the drawer when the drawer closes */
  activeHelpDrawer: PropTypes.string,
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
