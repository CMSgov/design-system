import PropTypes from 'prop-types';
import React from 'react';

export class StepLink extends React.PureComponent {
  handleClick(event) {
    if (this.props.onClick) {
      event.preventDefault();
      this.props.onClick(this.props.href, this.props.stepId);
    }
  }

  render() {
    const { href, screenReaderText, className, children } = this.props;
    const onClick = event => this.handleClick(event);
    return (
      <a href={href} onClick={onClick} className={className}>
        {children}
        {screenReaderText && (
          <span className="ds-u-visibility--screen-reader">
            {' '}
            {screenReaderText}
          </span>
        )}
      </a>
    );
  }
}

StepLink.propTypes = {
  /**
   * Label text or HTML.
   */
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  stepId: PropTypes.string,
  screenReaderText: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default StepLink;
