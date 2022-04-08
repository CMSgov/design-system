import * as React from 'react';
import '../styles/index.scss';

import Header from '../components/DocSiteHeader';
import Footer from '../components/DocSiteFooter';

// Main landing page for site
const IndexPage = () => {
  return (
    <div className="ds-base">
      <Header />
      <main className="ds-u-text-transform--uppercase">Placeholder for main content</main>
      <Footer />
    </div>
  );
};

export default IndexPage;
