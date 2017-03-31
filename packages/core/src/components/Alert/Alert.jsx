import React from 'react';
import classNames from 'classnames';

class Alert extends React.PureComponent {
  heading() {
    if (this.props.heading) {
      return <h3 className='ds-c-alert__heading'>{this.props.heading}</h3>;
    }
  }

  render() {
    const classes = classNames(
      'ds-c-alert',
      this.props.modifier && `ds-c-alert--${this.props.modifier}`,
      this.props.className
    );

    return (
      <div className={classes} role={this.props.role}>
        <div className='ds-c-alert__body'>
          {this.heading()}
          {this.props.children}
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  children: React.PropTypes.node.isRequired,
  heading: React.PropTypes.string,
  modifier: React.PropTypes.oneOf(['error', 'warn', 'success']),
  /** ARIA `role` */
  role: React.PropTypes.oneOf(['alert', 'alertdialog'])
};

export default Alert;
