import PropTypes from 'prop-types';
import React from 'react';

export class ReviewLink extends React.PureComponent {
  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.href);
    }
  }

  render() {
    const { href, className, children, ariaLabel } = this.props;
    const onClick = event => this.handleClick(event);
    return (
      <div>
        <a
          href={href}
          onClick={onClick}
          className={className}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      </div>
    );
  }
}

ReviewLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  /**
   * Provide this value to give screenreaders longer, more descriptive text to
   * explain the context of the link.
   */
  ariaLabel: PropTypes.string
};

export default ReviewLink;
