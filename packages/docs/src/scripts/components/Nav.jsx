import React from 'react';
import NavItem from './NavItem';

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
  currentPageURI: React.PropTypes.string.isRequired,
  routes: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      header: NavItem.propTypes.header,
      referenceURI: NavItem.propTypes.referenceURI
    })
  )
};

export default Nav;
