import NavItem from './NavItem';
import PropTypes from 'prop-types';
import React from 'react';

const Nav = props => {
  /* eslint-disable react/no-array-index-key */
  // These routes aren't changing, so we allow an array index to be used as key
  return (
    <nav className='l-col-3 l-sidebar ds-u-border-right--1 ds-u-padding--2'>
      <ol className='c-nav__list ds-c-vertical-nav'>
        {props.routes.map((page, index) => (
          <NavItem
            {...page}
            currentPageURI={props.currentPageURI}
            key={index}
          />
        ))}
      </ol>
    </nav>
  );
};

Nav.propTypes = {
  currentPageURI: NavItem.propTypes.currentPageURI,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      header: NavItem.propTypes.header,
      referenceURI: NavItem.propTypes.referenceURI,
      sections: NavItem.propTypes.sections
    })
  )
};

export default Nav;
