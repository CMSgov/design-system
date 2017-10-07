import PropTypes from 'prop-types';
import React from 'react';

export const Badge = props => {
  return <span className="ds-c-badge">{props.children}</span>;
};

Badge.propTypes = {
  /**
   * In most cases this will be the badge's label, but you could also use this
   * to nest more advanced JSX.
  */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
};

export default Badge;
