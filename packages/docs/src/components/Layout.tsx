import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';

import Footer from './DocSiteFooter';
import Navigation from './DocSiteNavigation';
import { SkipNav, Badge, UsaBanner } from '@cmsgov/design-system';
import { LocationInterface } from '../helpers/graphQLTypes';
import TableOfContents from './TableOfContents';
import TableOfContentsMobile from './TableOfContentsMobile';

import '../styles/index.scss';

export type PageStatus = 'draft' | 'do not use';

// TODO: deleve this variable and use graphQL data instead
const mockTOCdata = [
  {
    url: '#install-using-npm',
    title: 'Install using npm',
  },
  {
    url: '#download-zip',
    title: 'Download zip',
  },
  {
    url: '#utilize-the-cdn',
    title: 'Utilize the CDN',
  },
  {
    url: '#need-help-or-ran-into-an-issue',
    title: 'Need help or ran into an issue?',
  },
];

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

  // TODO: update data-theme value when theme switcher is created
  return (
    <div className="ds-base" data-theme="core">
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

      <UsaBanner className="ds-u-display--none ds-u-md-display--block" />

      <div className="ds-l-row ds-u-margin--0">
        <Navigation location={location} />
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
          <article className="ds-u-md-display--flex ds-u-border-top--1 ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-sm-padding-y--6 ds-u-padding-y--3 page-content">
            <div className="ds-l-lg-col--10">
              <div className="ds-u-display--block ds-u-lg-display--none">
                <TableOfContentsMobile data={mockTOCdata} />
              </div>
              {children}
            </div>
            <div className="ds-l-lg-col--2 ds-u-display--none ds-u-lg-display--block">
              <TableOfContents data={mockTOCdata} />
            </div>
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
