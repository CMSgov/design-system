import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class Alert extends React.PureComponent {
  constructor(props) {
    super(props);

    this.headingId = this.props.headingId || uniqueId('alert_');

    if (!props.heading && !props.children) {
      console.error(
        `Empty <Alert> components are not allowed, please use the 'heading' prop or include children.`
      );
    }
  }

  heading() {
    if (this.props.heading) {
      return (
        <h3 className="ds-c-alert__heading" id={this.headingId}>
          {this.props.heading}
        </h3>
      );
    }
  }

  render() {
    const classes = classNames(
      'ds-c-alert',
      this.props.hideIcon && 'ds-c-alert--hide-icon',
      this.props.variation && `ds-c-alert--${this.props.variation}`,
      this.props.className
    );

    return (
      <div
        className={classes}
        role={this.props.role}
        aria-labelledby={this.props.heading ? this.headingId : undefined}
      >
        <div className="ds-c-alert__body">
          {this.heading()}
          {this.props.children}
        </div>
      </div>
    );
  }
}
Alert.defaultProps = {
  role: 'region'
};
Alert.propTypes = {
  children: PropTypes.node,
  /**
   * Text for the alert heading
   */
  heading: PropTypes.string,
  /**
   * Optional id used to link the `aria-labelledby` attribute to the heading. If not provided, a unique id will be automatically generated and used.
   */
  headingId: PropTypes.string,
  /**
   * Boolean to hide the `Alert` icon
   */
  hideIcon: PropTypes.bool,
  /**
   * ARIA `role`, defaults to 'region'
   */
  role: PropTypes.oneOf(['alert', 'alertdialog', 'region']),
  /**
   * A string corresponding to the `Alert` variation classes (`error`, `warn`, `success`)
   */
  variation: PropTypes.oneOf(['error', 'warn', 'success'])
};

export default Alert;
