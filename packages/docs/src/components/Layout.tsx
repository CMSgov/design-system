import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import Header from './DocSiteHeader';
import Footer from './DocSiteFooter';
import Sidebar from './DocSiteSidebar';
import { SkipNav } from '@cmsgov/design-system';

import '../styles/index.scss';

interface LayoutProps {
  /**
   * The elements to appear in the main page content, below the page heading
   */
  children: React.ReactElement;
  /**
   * User-visible page title
   */
  pageName: string;
}

const Layout = ({ children, pageName }: LayoutProps) => {
  const env = 'prod';
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="ds-base">
      <Helmet title="CMS Design System">
        <script>{`window.tealiumEnvironment = "${env}";`}</script>
        <script src="//tags.tiqcdn.com/utag/cmsgov/cms-design/prod/utag.sync.js"></script>
      </Helmet>

      <SkipNav href="#main" />
      <Header />
      <div className="ds-l-row ds-u-margin--0">
        <Sidebar isMobileNavOpen={isMobileNavOpen} />
        <main id="main" className="ds-l-md-col ds-u-padding--0 ds-u-padding-bottom--4">
          <header className="ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block ds-u-fill--gray-lightest">
            <h1 className="ds-display ds-u-display--inline-block">{pageName}</h1>
          </header>
          <article className="ds-u-border-top--1 ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-sm-padding-y--6 ds-u-padding-y--3 page-content">
            {children}
          </article>
        </main>
      </div>

      <button
        className="ds-c-button ds-c-button--primary ds-u-md-display--none c-mobile-nav-button"
        onClick={toggleMenu}
      >
        {isMobileNavOpen ? 'Close' : 'Menu'}
      </button>

      <Footer />
    </div>
  );
};

export default Layout;
