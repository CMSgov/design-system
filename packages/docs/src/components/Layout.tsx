import React from 'react';
import { Helmet } from 'react-helmet';

import Footer from './DocSiteFooter';
import Navigation from './DocSiteNavigation';
import { SkipNav, UsaBanner } from '@cmsgov/design-system';
import {
  LocationInterface,
  FrontmatterInterface,
  TableOfContentsItem,
} from '../helpers/graphQLTypes';
import TableOfContents from './TableOfContents';
import TableOfContentsMobile from './TableOfContentsMobile';
import PageHeader from './PageHeader';

import '../styles/index.scss';

export type PageStatus = 'draft' | 'do not use';

interface LayoutProps {
  /**
   * The elements to appear in the main page content, below the page heading
   */
  children: React.ReactElement;
  /**
   * page metadata
   */
  frontmatter?: FrontmatterInterface;
  /**
   * page location data provided by gatsby
   */
  location: LocationInterface;
  /**
   * Slug of current page
   */
  slug?: string;
  /**
   * Current theme name
   */
  theme: string;
  /**
   * list of heading items to be used in table of contents
   */
  tableOfContentsData?: TableOfContentsItem[];
}

const Layout = ({
  children,
  frontmatter,
  location,
  slug,
  theme,
  tableOfContentsData,
}: LayoutProps) => {
  const env = 'prod';

  const tabTitle = frontmatter?.title
    ? `${frontmatter.title} - CMS Design System`
    : 'CMS Design System';

  return (
    <div className="ds-base">
      <Helmet
        title={tabTitle}
        htmlAttributes={{
          lang: 'en',
        }}
        bodyAttributes={{
          'data-theme': theme,
        }}
      >
        <script>{`window.tealiumEnvironment = "${env}";`}</script>
        <script src="//tags.tiqcdn.com/utag/cmsgov/cms-design/prod/utag.sync.js"></script>
      </Helmet>
      <SkipNav href="#main" />

      <UsaBanner className="ds-u-display--none ds-u-md-display--block" />

      <div className="ds-l-row ds-u-margin--0 full-height">
        <Navigation location={location} />
        <main id="main" className="ds-l-md-col ds-u-padding--0 ds-u-padding-bottom--4 page-main">
          <PageHeader frontmatter={frontmatter} theme={theme} />
          <article className="ds-u-md-display--flex ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-sm-padding-bottom--6 ds-u-sm-padding-top--1 ds-u-padding-bottom--3 page-content">
            <div className="page-content__content ds-l-lg-col--9 ds-u-padding-left--0">
              <div className="ds-u-display--block ds-u-lg-display--none">
                <TableOfContentsMobile
                  title={frontmatter.title}
                  items={tableOfContentsData || []}
                  slug={slug}
                />
              </div>
              {children}
            </div>
            <div className="ds-l-lg-col--3 ds-u-display--none ds-u-lg-display--block">
              <TableOfContents
                title={frontmatter.title}
                items={tableOfContentsData || []}
                slug={slug}
              />
            </div>
          </article>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
