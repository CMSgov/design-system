import React from 'react';
import {Link} from 'react-router-dom';

class NavItem extends React.Component {
  subpages(sections) {
    if (sections.length) {
      return (
        <ul>
          {sections.map(page => (
            <li key={page.referenceNumber}>
              <Link to={page.referenceURI}>{page.header}</Link>
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <li>
        <Link to={this.props.referenceURI}>{this.props.header}</Link>
        {this.subpages(this.props.sections)}
      </li>
    );
  }
}

NavItem.propTypes = {
  depth: React.PropTypes.number.isRequired,
  header: React.PropTypes.string.isRequired,
  referenceURI: React.PropTypes.string.isRequired,
  sections: React.PropTypes.array.isRequired
};

export default NavItem;
