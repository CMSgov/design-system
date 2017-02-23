import React from 'react';
import classNames from 'classnames';

/**
 * A Button component
 */
class Button extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Note that if / when we expand this button component to support both
    // type=button and type=submit, then we will want to preventDefault to
    // avoid a default form submission.
    if (this.props.disabled) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    var className = classNames({
      'hc-btn': true,
      'hc-btn-lg': true,
      'hc-btn-submit': true,
      'disabled': this.props.disabled,
      'hc-btn-blue': this.props.use === 'secondary',
      'hc-btn-success': this.props.use === 'primary'
    });

    var inlineStyle;
    if (this.props.use === 'neutral') {
      inlineStyle = {
        textShadow: 'none'
      };
    }

    return <div className={this.props.containerClassName}
      onClick={this.handleClick}>
      <button className={className}
        type={this.props.type}
        aria-label={this.props.label}
        disabled={this.props.disabled}
        style={inlineStyle}>
        {this.props.label}
      </button>
    </div>;
  }
}

Button.displayName = 'Button';

Button.defaultProps = {
  type: 'button',
  use: 'primary'
};

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  containerClassName: React.PropTypes.string,
  type: React.PropTypes.oneOf(['button', 'submit']),
  /**
   * Primary (the default) buttons are green. Secondary buttons are blue.
   */
  use: React.PropTypes.oneOf(['primary', 'secondary', 'neutral'])
};

export default Button;
