import PropTypes from 'prop-types';
import React from 'react';
import breakpoints from '../shared/breakpoints';
import classNames from 'classnames';

class BreakpointToggles extends React.PureComponent {
  /**
   * @param {String} breakpoint - The key
   */
  handleClick(breakpoint) {
    this.props.onClick(breakpoint);
  }

  toggles() {
    return Object.keys(breakpoints).map(key => {
      const classes = classNames(`ds-l-col bp-toggle bp-toggle--${key}`, {
        'bp-toggle--active': key === this.props.activeBreakpoint
      });
      const width = breakpoints[key];

      return (
        <button
          className={classes}
          key={key}
          onClick={() => this.handleClick(key)}
          title={`Change preview size to ${width}`}
        >
          <strong className="ds-u-display--block">{key}</strong>
          <span className="ds-u-font-size--small">Width: {width}</span>
        </button>
      );
    });
  }

  render() {
    return (
      <div className="bp-toggles ds-l-row ds-u-margin-x--0">
        {this.toggles()}
      </div>
    );
  }
}

BreakpointToggles.defaultProps = {
  activeBreakpoint: 'lg'
};

BreakpointToggles.propTypes = {
  activeBreakpoint: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default BreakpointToggles;
