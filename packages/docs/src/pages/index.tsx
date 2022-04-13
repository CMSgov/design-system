import * as React from 'react';
import '../styles/index.scss';

import Header from '../components/DocSiteHeader';
import Footer from '../components/DocSiteFooter';
import Sidebar from '../components/DocSiteNav';
import { SkipNav } from '@cmsgov/design-system';

// Main landing page for site
const IndexPage = () => {
  return (
    <div className="ds-base">
      <SkipNav href="#main" />
      <Header />
      <div className="ds-l-row ds-u-margin--0">
        <Sidebar />
        <main id="main" className="ds-u-text-transform--uppercase">
          Placeholder for main content
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default IndexPage;
