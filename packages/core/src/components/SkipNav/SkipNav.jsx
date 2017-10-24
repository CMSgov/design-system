import PropTypes from 'prop-types';
import React from 'react';

export function SkipNav(props) {
  return (
    <a className="ds-c-skip-nav" href={props.href}>
      {props.children}
    </a>
  );
}

SkipNav.defaultProps = {
  children: 'Skip to main content'
};

SkipNav.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * The anchor or target for the link (where the link will jump the user to)
   */
  href: PropTypes.string.isRequired
};

export default SkipNav;
