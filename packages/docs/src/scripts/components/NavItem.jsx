import React from 'react';

class NavItem extends React.PureComponent {
  subpages(sections) {
    if (sections.length) {
      return (
        <ul className='ds-c-vertical-nav__subnav'>
          {sections.map(page => (
            <li
              className='ds-c-vertical-nav__item'
              key={page.referenceURI}
            >
              <a
                className={this.linkClasses(page)}
                href={`/${page.referenceURI}`}
              >
                {page.header}
              </a>
            </li>
          ))}
        </ul>
      );
    }
  }

  linkClasses(page, bold = false) {
    let linkClasses = ['ds-c-vertical-nav__link'];
    const parentURI = this.props.currentPageURI.replace(/\/[a-z\-0-9]+$/, '');
    const curentParent = page.referenceURI === parentURI;

    if (page.referenceURI === this.props.currentPageURI || curentParent) {
      linkClasses.push('ds-c-vertical-nav__link--current');
    }

    if (bold) {
      linkClasses.push('ds-u-font-weight--bold');
    }

    return linkClasses.join(' ');
  }

  render() {
    return (
      <li className='ds-c-vertical-nav__item'>
        <a
          className={this.linkClasses(this.props, true)}
          href={`/${this.props.referenceURI}`}
        >
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

const NavItemPropTypes = {
  header: React.PropTypes.string.isRequired,
  referenceURI: React.PropTypes.string.isRequired
};

NavItem.propTypes = {
  currentPageURI: React.PropTypes.string.isRequired,
  sections: React.PropTypes.arrayOf(
    React.PropTypes.shape(NavItemPropTypes)
  ),
  ...NavItemPropTypes
};

export default NavItem;
