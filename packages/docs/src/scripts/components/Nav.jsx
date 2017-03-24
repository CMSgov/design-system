import React from 'react';
import NavItem from './NavItem';

class Nav extends React.Component {
  render() {
    return (
      <nav className='c-nav'>
        <ol className='c-nav__list ds-c-vertical-nav'>
          {this.props.routes.map(page => (
            <NavItem
              {...page}
              currentPageURI={this.props.currentPageURI}
              key={page.referenceURI}
            />
          ))}
        </ol>
      </nav>
    );
  }
}

Nav.propTypes = {
  currentPageURI: React.PropTypes.string.isRequired,
  routes: React.PropTypes.array.isRequired
};

export default Nav;
