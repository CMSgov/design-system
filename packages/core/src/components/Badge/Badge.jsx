import React from 'react';

class Badge extends React.Component {
  render() {
    return <span className="hc-c-badge">{this.props.children}</span>;
  }
}

Badge.displayName = 'Badge';
Badge.propTypes = {
  /**
   * In most cases this will be the badge's label, but you could also use this
   * to nest more advanced JSX.
  */
  children: React.PropTypes.any.isRequired
};

export default Badge;
