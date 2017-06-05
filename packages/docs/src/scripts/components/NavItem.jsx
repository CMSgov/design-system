import PropTypes from 'prop-types';
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
    const linkProps = {
      className: this.linkClasses(this.props, true),
      href: this.props.referenceURI ? `/${this.props.referenceURI}` : undefined
    };

    const LinkComponent = linkProps.href ? 'a' : 'div';

    return (
      <li className='ds-c-vertical-nav__item'>
        <LinkComponent {...linkProps}>
          {this.props.header}
        </LinkComponent>
        {this.subpages(this.props.sections)}
      </li>
    );
  }
}

NavItem.defaultProps = {
  sections: []
};

const NavItemPropTypes = {
  header: PropTypes.string.isRequired,
  referenceURI: PropTypes.string
};

NavItem.propTypes = {
  currentPageURI: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape(NavItemPropTypes)
  ),
  ...NavItemPropTypes
};

export default NavItem;
