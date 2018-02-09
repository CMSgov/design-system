import PropTypes from 'prop-types';
import React from 'react';

export class ReviewLink extends React.PureComponent {
  handleClick(event) {
    if (this.props.onClick) {
      event.preventDefault();
      this.props.onClick(this.props.href);
    }
  }

  render() {
    const { href, className, children } = this.props;
    const onClick = event => this.handleClick(event);
    return (
      <div className="ds-u-margin--0">
        <a href={href} onClick={onClick} className={className}>
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
  onClick: PropTypes.func
};

export default ReviewLink;
