import React from 'react';

class NavItem extends React.Component {
  subpages(sections) {
    if (sections.length) {
      return (
        <ul className='ds-c-vertical-nav__subnav'>
          {sections.map(page => (
            <li className='ds-c-vertical-nav__item'
              key={page.referenceURI}>
              <a className={this.linkClasses(page)}
                href={`/${page.referenceURI}`}>{page.header}</a>
            </li>
          ))}
        </ul>
      );
    }
  }

  linkClasses(page, bold = false) {
    let linkClasses = ['ds-c-vertical-nav__link'];
    let curentParent = (
      page.referenceURI !== '' &&
      this.props.currentPageURI.match(new RegExp(page.referenceURI))
    );

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
        <a className={this.linkClasses(this.props, true)}
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
  currentPageURI: React.PropTypes.string.isRequired,
  header: React.PropTypes.string.isRequired,
  referenceURI: React.PropTypes.string.isRequired,
  sections: React.PropTypes.array
};

export default NavItem;
