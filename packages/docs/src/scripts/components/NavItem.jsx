import React from 'react';

class NavItem extends React.Component {
  subpages(sections) {
    if (sections.length) {
      return (
        <ul>
          {sections.map(page => (
            <li key={page.referenceURI}>
              <a href={`/${page.referenceURI}`}>{page.header}</a>
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <li>
        <a href={this.props.referenceURI}>{this.props.header}</a>
        {this.subpages(this.props.sections)}
      </li>
    );
  }
}

NavItem.propTypes = {
  header: React.PropTypes.string.isRequired,
  referenceURI: React.PropTypes.string.isRequired,
  sections: React.PropTypes.array.isRequired
};

export default NavItem;
