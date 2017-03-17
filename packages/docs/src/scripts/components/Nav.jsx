import React from 'react';
import NavItem from './NavItem';

class Nav extends React.Component {
  render() {
    return (
      <nav className='c-nav'>
        <ol>
          {this.props.pages.map(page => (
            <NavItem key={page.referenceNumber} {...page} />
          ))}
        </ol>
      </nav>
    );
  }
}

Nav.propTypes = {
  pages: React.PropTypes.array.isRequired
};

export default Nav;
