import NavItem from './NavItem';
import PropTypes from 'prop-types';
import React from 'react';

const Nav = (props) => {
  return (
    <nav className='c-nav'>
      <ol className='c-nav__list ds-c-vertical-nav'>
        {props.routes.map(page => (
          <NavItem
            {...page}
            currentPageURI={props.currentPageURI}
            key={page.referenceURI}
          />
        ))}
      </ol>
    </nav>
  );
};

Nav.propTypes = {
  currentPageURI: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      header: NavItem.propTypes.header,
      referenceURI: NavItem.propTypes.referenceURI
    })
  )
};

export default Nav;
