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
    const ComponentType = this.props.component || 'a';

    return (
      <ComponentType href={href} onClick={e => this.handleClick(e)} className={className}>
        {children}
        {screenReaderText && (
          <span className="ds-u-visibility--screen-reader"> {screenReaderText}</span>
        )}
      </ComponentType>
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
  onClick: PropTypes.func,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default StepLink;
