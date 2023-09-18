import React from 'react';
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

import '../../styles/index.scss';
import { getThemeData } from './SideNav/themeVersionData';
import ThemeVersionSection from './SideNav/ThemeVersionSection';
import FilterDialogManager from './FilterDialog/FilterDialogManager';

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
}

const Layout = ({
  children,
  frontmatter,
  pageHeader,
  location,
  slug,
  theme,
  tableOfContentsData,
}: LayoutProps) => {
  const env = 'prod';
  const baseTitle = theme === 'core' ? 'CMS Design System' : getThemeData(theme).longName;
  const tabTitle = frontmatter?.title ? `${frontmatter.title} - ${baseTitle}` : baseTitle;

  const pageId = slug ? `page--${slug.replace('/', '_')}` : null;

  return (
    <div className="ds-base" data-theme={theme} id={pageId}>
      <Helmet
        title={tabTitle}
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <script>{`window.tealiumEnvironment = "${env}";`}</script>
        <script src="//tags.tiqcdn.com/utag/cmsgov/cms-design/prod/utag.sync.js"></script>
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
          <article className="ds-u-md-display--flex ds-u-padding-x--3 ds-u-sm-padding-x--6 ds-u-sm-padding-bottom--6 ds-u-padding-top--1 ds-u-padding-bottom--3 page-body">
            <div className="ds-l-row">
              <div className="ds-l-lg-col--9">
                <div className="ds-u-display--block ds-u-lg-display--none ds-u-margin-bottom--3">
                  <TableOfContentsMobile
                    title={frontmatter.title}
                    items={tableOfContentsData || []}
                    slug={slug}
                  />
                </div>
                <div className="page-body__content">{children}</div>
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
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
