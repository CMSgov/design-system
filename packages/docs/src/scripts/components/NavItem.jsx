import React from 'react';

class NavItem extends React.Component {
  subpages(sections) {
    if (sections.length) {
      return (
        <ul className='ds-c-vertical-nav__subnav'>
          {sections.map(page => (
            <li className='ds-c-vertical-nav__item'
              key={page.referenceURI}>
              <a className='ds-c-vertical-nav__link'
                href={`/${page.referenceURI}`}>{page.header}</a>
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <li className='ds-c-vertical-nav__item'>
        <a className='ds-c-vertical-nav__link ds-u-font-weight--bold'
          href={`/${this.props.referenceURI}`}>
          {this.props.header}
        </a>
        {this.subpages(this.props.sections)}
      </li>
    );
  }
}

NavItem.defaultProps = {
  sections: []
};

NavItem.propTypes = {
  header: React.PropTypes.string.isRequired,
  referenceURI: React.PropTypes.string.isRequired,
  sections: React.PropTypes.array
};

export default NavItem;
