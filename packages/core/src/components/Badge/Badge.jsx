import React from 'react';

const Badge = (props) => {
  return <span className='ds-c-badge'>{props.children}</span>;
};

Badge.displayName = 'Badge';
Badge.propTypes = {
  /**
   * In most cases this will be the badge's label, but you could also use this
   * to nest more advanced JSX.
  */
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string
  ]).isRequired
};

export default Badge;
