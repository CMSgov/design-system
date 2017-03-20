import React from 'react';
import NavItem from './NavItem';

class Nav extends React.Component {
  render() {
    return (
      <nav className='c-nav'>
        <ol>
          {this.props.routes.map(page => (
            <NavItem key={page.referenceURI} {...page} />
          ))}
        </ol>
      </nav>
    );
  }
}

Nav.propTypes = {
  routes: React.PropTypes.array.isRequired
};

export default Nav;
