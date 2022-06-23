import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';

import Header from './DocSiteHeader';
import Footer from './DocSiteFooter';
import Sidebar from './DocSiteSidebar';
import { SkipNav, Badge } from '@cmsgov/design-system';
import { LocationInterface } from '../helpers/graphQLTypes';

import '../styles/index.scss';

export type PageStatus = 'draft' | 'do not use';

interface LayoutProps {
  /**
   * The elements to appear in the main page content, below the page heading
   */
  children: React.ReactElement;
  /**
   * page location data provided by gatsby
   */
  location: LocationInterface;
  /**
   * User-visible page title
   */
  pageName: string;
  /**
   * string for url of related guidance from USWDS
   */
  relatedGuidance?: string;
  /**
   * describes if page header should include a 'jump to guidance' link
   */
  showJumpToGuidance?: boolean;
  /**
   * describes status of page. used for component pages
   */
  status?: PageStatus;
}

const Layout = ({
  children,
  pageName,
  relatedGuidance,
  showJumpToGuidance,
  status,
  location,
}: LayoutProps) => {
  const env = 'prod';
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="ds-base">
      <Helmet
        title="CMS Design System"
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <script>{`window.tealiumEnvironment = "${env}";`}</script>
        <script src="//tags.tiqcdn.com/utag/cmsgov/cms-design/prod/utag.sync.js"></script>
      </Helmet>

      <SkipNav href="#main" />
      <Header />
      <div className="ds-l-row ds-u-margin--0">
        <Sidebar isMobileNavOpen={isMobileNavOpen} location={location} />
        <main id="main" className="ds-l-md-col ds-u-padding--0 ds-u-padding-bottom--4">
          <header className="ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block ds-u-fill--gray-lightest">
            <div className="ds-u-display--flex ds-u-align-items--center">
              <h1 className="ds-display ds-u-display--inline-block">{pageName}</h1>
              {status && (
                <Badge
                  variation="warn"
                  className="ds-u-margin-left--1 ds-u-text-transform--capitalize"
                >
                  {status}
                </Badge>
              )}
            </div>

            {(relatedGuidance || showJumpToGuidance) && (
              <div className="ds-u-font-size--small">
                {showJumpToGuidance && (
                  <Link to="#guidance" className="ds-u-sm-margin-right--2">
                    Jump to Guidance
                  </Link>
                )}
                {relatedGuidance && (
                  <div className="ds-u-sm-display--inline-block">
                    {' '}
                    View related guidance in the{' '}
                    <a href={`https://designsystem.digital.gov/${relatedGuidance}`}>
                      U.S. Web Design System
                    </a>
                  </div>
                )}
              </div>
            )}
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
