import type * as React from 'react';
import { useEffect, useState } from 'react';
import Footer from './DocSiteFooter';
import SideNav from './SideNav/SideNav';
import PageHeader from './PageHeader';
import TableOfContents from './TableOfContents';
import TableOfContentsMobile from './TableOfContentsMobile';
import HeaderFullWidth from './HeaderFullWidth';
import { Helmet } from 'react-helmet';
import { SkipNav, UsaBanner } from '@cmsgov/design-system';
import {
  LocationInterface,
  FrontmatterInterface,
  TableOfContentsItem,
} from '../../helpers/graphQLTypes';
import { withPrefix } from 'gatsby';
import { sendViewEvent } from '@cmsgov/design-system';

import '../../styles/index.scss';
import { getThemeData } from './SideNav/themeVersionData';
import ThemeVersionSection from './SideNav/ThemeVersionSection';
import FilterDialogManager from './FilterDialog/FilterDialogManager';

interface LayoutProps {
  /**
   * The elements to appear in the main page content, below the page heading
   */
  children: React.ReactNode;
  /**
   * page metadata
   */
  frontmatter?: FrontmatterInterface;
  /**
   * Optional custom page header
   */
  pageHeader?: React.ReactNode;
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
  /**
   * Just used for designer-tools right now. This is a messy way of doing it.
   * The whole layout thing needs to be refactored, and I've done that in the
   * Astro branch.
   */
  fullWidth?: boolean;
}

const Layout = ({
  children,
  frontmatter,
  fullWidth,
  pageHeader,
  location,
  slug,
  theme,
  tableOfContentsData,
}: LayoutProps) => {
  const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  const baseTitle = theme === 'core' ? 'CMS Design System' : getThemeData(theme).longName;
  const tabTitle = frontmatter?.title ? `${frontmatter.title} - ${baseTitle}` : baseTitle;

  const pageId = slug ? `page--${slug.replace('/', '_')}` : null;

  if (typeof window != 'undefined' && 'tealiumEnvironment' in window) {
    window.tealiumEnvironment = env;
  }

  useEffect(() => {
    const analyticsPayload = {
      content_language: 'en',
      content_type: 'html',
      logged_in: 'false',
      page_name: tabTitle,
      page_type: tabTitle.includes('Page not found') ? 'true' : 'false', // If page is a 404 (error page) this is set to true, otherwise it is false
      site_environment: env, // Used to include or exclude traffic from different testing environments. Ex: test, test0, imp, production
      site_section: location.pathname == '/' ? 'index' : location.pathname, // Set the section to the pathname, except in the case of the index.
    } as any;

    sendViewEvent(analyticsPayload);
  }, [location.pathname, tabTitle]);

  return (
    <div data-theme={theme} id={pageId}>
      <Helmet
        title={tabTitle}
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <meta
          property="og:title"
          content={
            slug?.includes('not-in-sidebar') ? baseTitle : `${frontmatter?.title} - ${baseTitle}`
          }
        />
        <meta
          property="og:type"
          content={slug?.includes('not-in-sidebar') ? 'website' : 'article'}
        />
        <meta property="og:url" content={location.origin + location.pathname} />
        <meta
          property="og:description"
          content={
            frontmatter.intro
              ? frontmatter.intro
              : 'The CMS Design System is a set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites.'
          }
        />
        <script>{`window.tealiumEnvironment = "${env}";`}</script>
        <script src={`https://tealium-tags.cms.gov/cms-design/${env}/utag.sync.js`}></script>
        <script type="text/javascript">
          {'window.utag_cfg_ovrd = window.utag_cfg_ovrd || {}; window.utag_cfg_ovrd.noview = true;'}
        </script>
        <link
          rel="stylesheet"
          type="text/css"
          title="docThemeCss"
          href={withPrefix(`themes/${theme}-theme.css`)}
        />
      </Helmet>
      <SkipNav href="#main" />

      <UsaBanner className="ds-u-display--none ds-u-md-display--block" />

      <HeaderFullWidth />

      <div className="ds-l-row ds-u-margin--0 full-height">
        <FilterDialogManager>
          <SideNav location={location} />
          <div className="ds-u-md-display--none ds-u-padding-x--3 ds-u-padding-top--2">
            <ThemeVersionSection />
          </div>
        </FilterDialogManager>
        <main
          id="main"
          className="ds-l-md-col ds-u-padding--0 ds-u-padding-bottom--4 ds-u-padding-top--2 page-main"
        >
          {pageHeader ? pageHeader : <PageHeader frontmatter={frontmatter} theme={theme} />}
          {fullWidth ? (
            <article className="ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-sm-padding-bottom--6 ds-u-padding-top--1 ds-u-padding-bottom--3">
              {children}
            </article>
          ) : (
            <article className="ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-sm-padding-bottom--6 ds-u-padding-top--1 ds-u-padding-bottom--3 page-body">
              <div className="ds-l-row">
                <div className="ds-l-lg-col--9">
                  <div className="ds-u-lg-display--none ds-u-margin-bottom--3">
                    <TableOfContentsMobile
                      title={frontmatter.title}
                      items={tableOfContentsData || []}
                      slug={slug}
                    />
                  </div>
                  <div className="page-body__content ds-u-measure--wide">{children}</div>
                </div>
                <div className="ds-l-lg-col--3 ds-u-display--none ds-u-lg-display--block">
                  <TableOfContents
                    title={frontmatter.title}
                    items={tableOfContentsData || []}
                    slug={slug}
                  />
                </div>
              </div>
            </article>
          )}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
