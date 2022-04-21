import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/index.scss';

import Header from '../components/DocSiteHeader';
import Footer from '../components/DocSiteFooter';
import Sidebar from '../components/DocSiteNav';
import { SkipNav } from '@cmsgov/design-system';

// Main landing page for site
const IndexPage = () => {
  const env = 'prod';

  return (
    <div className="ds-base">
      <Helmet title="CMS Design System">
        <script>{`window.tealiumEnvironment = "${env}";`}</script>
        <script src="//tags.tiqcdn.com/utag/cmsgov/cms-design/prod/utag.sync.js"></script>
      </Helmet>

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
