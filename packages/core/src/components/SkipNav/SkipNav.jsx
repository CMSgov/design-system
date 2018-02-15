import PropTypes from 'prop-types';
import React from 'react';

export function SkipNav({ children, href, onClick }) {
  return (
    <a className="ds-c-skip-nav" href={href} onClick={onClick}>
      {children}
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
  href: PropTypes.string.isRequired,
  /**
   * An onClick handler used for manually setting focus on the content.
   * Sometimes it's necessary to manually set focus, like when an app uses hash
   * routing and element-id links will be mistaken for routes.
   */
  onClick: PropTypes.func
};

export default SkipNav;
