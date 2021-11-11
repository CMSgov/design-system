/* eslint-disable jsx-a11y/no-redundant-roles */
import MenuLinks from './MenuLinks';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const Menu = function (props) {
  const classes = classnames('hc-c-menu', {
    'hc-c-menu--open': props.open,
  });

  return (
    <nav id="hc-c-menu" className={classes} role="navigation">
      <div className="ds-l-container">
        <div className="ds-l-row">
          <div className="hc-c-menu__content ds-u-padding--1 ds-u-font-weight--bold">
            {props.submenuTop}
            {props.beforeLinks}
            {props.links && (
              <div className="ds-l-col ds-l-col--auto ds-u-padding-x--0">
                <MenuLinks links={props.links} />
              </div>
            )}
            {props.submenuBottom}
          </div>
        </div>
      </div>
    </nav>
  );
};

Menu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      identifier: PropTypes.string,
      href: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
    })
  ),
  submenuTop: PropTypes.node,
  submenuBottom: PropTypes.node,
  /**
   * Nodes to be rendered before the links column
   */
  beforeLinks: PropTypes.node,
  /**
   * When the menu is collapsed, passing in "open" will
   * expand it and make it visible.
   */
  open: PropTypes.bool,
};

export default Menu;
