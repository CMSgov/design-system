/**
 * This is main template file for the documentation site.
 */
import Footer from './Footer';
import GitHubLinks from './GitHubLinks';
import Header from './Header';
import Nav from './Nav';
import Page from './Page';
import PropTypes from 'prop-types';
import React from 'react';
import { SkipNav } from '@cmsgov/design-system';
import classNames from 'classnames';
import queryString from 'query-string';

class Docs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  toggleMenu() {
    if (!this.state.menuOpen) {
      this.scrollY = window.scrollY;
    }

    this.setState({ menuOpen: !this.state.menuOpen }, () => {
      if (!this.state.menuOpen) {
        window.scrollTo(0, this.scrollY);
      }
    });
  }

  render() {
    const { routes, page } = this.props;
    const { menuOpen } = this.state;
    const view = typeof window !== 'undefined' && queryString.parse(window.location.search).view;
    /**
     * Hide site header, site footer, side nav when URL parameters query string 'view' contains
     * 'basic', 'guidance' or 'page' (ie. design-system.cms.gov/components/button/?view=basic)
     */
    const hideHeaders = view === 'basic' || view === 'guidance' || view === 'page';
    return hideHeaders ? (
      <main id="main" className="ds-l-md-col ds-u-padding--0 ds-u-padding-bottom--4">
        <Page {...page} view={view} />
      </main>
    ) : (
      <div
        className={classNames('docs', {
          'docs--menu-open': menuOpen,
          'docs--locked': menuOpen,
        })}
      >
        <SkipNav href="#main" />
        <Header />
        <div className="ds-l-row ds-u-margin--0">
          <nav className="ds-l-md-col--3 ds-u-padding--2 ds-u-fill--white docs__sidebar">
            <Nav items={routes} selectedId={page.referenceURI} />
            <GitHubLinks className="ds-u-md-display--none ds-u-margin-top--2" vertical />
          </nav>
          <main id="main" className="ds-l-md-col ds-u-padding--0 ds-u-padding-bottom--4">
            <Page {...page} />
          </main>
        </div>
        <button
          className="ds-c-button ds-c-button--primary ds-u-md-display--none docs__toggle"
          onClick={() => this.toggleMenu()}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <Footer />
      </div>
    );
  }
}

Docs.propTypes = {
  page: PropTypes.shape(Page.propTypes).isRequired,
  routes: Nav.propTypes.items,
};

export default Docs;
