import React, { useState } from 'react';
import '../styles/index.scss';

import Header from '../components/DocSiteHeader';
import Footer from '../components/DocSiteFooter';
import Sidebar from '../components/DocSiteSidebar';
import { SkipNav } from '@cmsgov/design-system';

// Main landing page for site
const IndexPage = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="ds-base">
      <SkipNav href="#main" />
      <Header />
      <div className="ds-l-row ds-u-margin--0">
        <Sidebar isMobileNavOpen={isMobileNavOpen} />
        <main id="main" className="ds-u-text-transform--uppercase">
          Placeholder for main content
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

export default IndexPage;
