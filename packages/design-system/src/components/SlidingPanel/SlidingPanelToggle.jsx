import Button from '../Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * A link that triggers the visibility of a sliding panel
 */
export class SlidingPanelToggle extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (!this.props.panelOpen && prevProps.panelOpen && this.buttonRef) {
      this.buttonRef.focus();
    }
  }

  render() {
    const { className, children, inline, showPanel, panelOpen, ...others } = this.props;
    const classes = classNames(
      'ds-c-help-drawer__toggle',
      inline && 'ds-c-help-drawer__toggle--inline',
      className
    );

    return (
      <Button
        className={classes}
        inputRef={(el) => (this.buttonRef = el)}
        onClick={() => showPanel()}
        variation="transparent"
        {...others}
      >
        {children}
      </Button>
    );
  }
}

SlidingPanelToggle.propTypes = {
  /**
   * Determines if SlidingPanel is open or closed.
   * This value is used to re-focus the toggle that opened the panel when the panel closes.
   */
  panelOpen: PropTypes.bool.isRequired,
  /**
   * SlidingPanelToggle content.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes for the toggle button anchor element.
   */
  className: PropTypes.string,
  /**
   * Adds `display: inline` to the SlidingPanelToggle.
   */
  inline: PropTypes.bool,
  /**
   * This function is called with an id that the toggle generates.
   * It can be used in implementing the SlidingPanel for keeping track of which panel the toggle controls.
   */
  showPanel: PropTypes.func.isRequired,
};

export default SlidingPanelToggle;
