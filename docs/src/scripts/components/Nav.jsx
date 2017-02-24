import React from 'react';
import {Link} from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav className="nav">
        <ol>
          {this.props.pages.map(page => (
            <li key={page.referenceNumber}>
              <Link to={page.referenceURI}>{page.header}</Link>
            </li>
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
