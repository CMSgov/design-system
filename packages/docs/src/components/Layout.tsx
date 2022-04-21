import React from 'react';
import { Helmet } from 'react-helmet';

import Header from './DocSiteHeader';
import Footer from './DocSiteFooter';
import Sidebar from './DocSiteNav';
import { SkipNav } from '@cmsgov/design-system';

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
        <main id="main" className="ds-l-md-col ds-u-padding--0 ds-u-padding-bottom--4">
          <header className="ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block ds-u-fill--gray-lightest">
            <h1 className="ds-display ds-u-display--inline-block">{pageName}</h1>
          </header>
          <article className="ds-u-border-top--1 ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-sm-padding-y--6 ds-u-padding-y--3">
            {children}
          </article>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
