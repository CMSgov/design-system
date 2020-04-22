import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class Alert extends React.PureComponent {
  constructor(props) {
    super(props);

    this.headingId = this.props.headingId || uniqueId('alert_');

    if (process.env.NODE_ENV !== 'production') {
      if (!props.heading && !props.children) {
        console.warn(
          `Empty <Alert> components are not allowed, please use the 'heading' prop or include children.`
        );
      }
    }
  }

  heading() {
    const Heading = `h${this.props.headingLevel}` || `h3`;
    if (this.props.heading) {
      return (
        <Heading className="usa-alert__heading" id={this.headingId}>
          {this.props.heading}
        </Heading>
      );
    }
  }

  render() {
    const classes = classNames(
      'usa-alert',
      this.props.hideIcon && 'usa-alert--no-icon',
      this.props.slimAlert && 'usa-alert--slim',
      this.props.variation && `usa-alert--${this.props.variation}`,
      this.props.className
    );

    return (
      <div
        className={classes}
        role={this.props.role}
        aria-labelledby={this.props.heading ? this.headingId : undefined}
      >
        <div className="usa-alert__body">
          {this.heading()}
          {this.props.children}
        </div>
      </div>
    );
  }
}
Alert.defaultProps = {
  role: 'region',
  headingLevel: '3',
  variation: 'info'
};
Alert.propTypes = {
  /**
   * The alert's body content
   */
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
   * Heading type to override default `<h3>`.
   */
  headingLevel: PropTypes.oneOf(['1', '2', '3', '4', '5']),
  /**
   * Boolean to hide the `Alert` icon
   */
  hideIcon: PropTypes.bool,
  /**
   * Boolean to use a slim alert
   */
  slimAlert: PropTypes.bool,
  /**
   * ARIA `role`, defaults to 'region'
   */
  role: PropTypes.oneOf(['alert', 'alertdialog', 'region']),
  /**
   * A string corresponding to the `Alert` variation classes (`error`, `warn`, `success`)
   */
  variation: PropTypes.oneOf(['error', 'warning', 'success', 'info'])
};

export default Alert;
