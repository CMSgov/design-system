import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { Button, CloseIconThin, MenuIconThin, UsaBanner, VerticalNav } from '@cmsgov/design-system';
import { useStaticQuery, graphql } from 'gatsby';
import ThemeVersionSection from './ThemeVersionSection';
import SearchForm from '../../content/SearchForm';
import { LocationInterface, NavDataQuery } from '../../../helpers/graphQLTypes';
import {
  DocsNavItem,
  convertToNavItems,
  organizeNavItems,
} from '../../../helpers/navDataFormatUtils';
import GithubIcon from '../../icons/GithubIcon';
import NewsIcon from '../../icons/NewsIcon';

interface SideNavProps {
  location: LocationInterface;
}

/**
 * A wrapper for the gatsby link to handle internal site navigation
 */
const GatsbyLink = (props: any /* See VerticalNavItemLabel.tsx */) => (
  <Link to={props.href} {...props}>
    {props.children}
  </Link>
);

/**
 * DocSiteNav
 * queries all MDX files and generates the proper format to create a vertical nav
 * @returns {React Element}
 * @todo figure out which item is currently selected and mark & expand appropriately
 */
const SideNav = ({ location }: SideNavProps) => {
  // Open/close state is controlled by toggleMenu()
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  /*
   ** Need to know if screen width is at a medium breakpoint to set
   ** a11y attrs on mobile nav links - attrs not needed for desktop
   */
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (window) {
      // `md` media query derived from: https://design.cms.gov/guidelines/responsive/
      const media = window.matchMedia('(max-width: 768px)');

      if (media.matches !== isMobile) {
        setIsMobile(media.matches);
      }

      const listener = () => {
        setIsMobile(media.matches);
      };

      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      setIsMobile(true);
    }
  }, [isMobile]);

  const data: NavDataQuery = useStaticQuery(graphql`
    query SiteNavQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "content" }
          ext: { eq: ".mdx" }
          relativeDirectory: { nin: ["not-in-sidebar", "blog"] }
        }
        sort: { fields: [relativeDirectory, name] }
      ) {
        group(field: relativeDirectory) {
          fieldValue
          edges {
            node {
              relativePath
              childMdx {
                frontmatter {
                  title
                  order
                }
              }
            }
          }
        }
      }
    }
  `);

  const navItems: DocsNavItem[] = useMemo(() => {
    const navItems: DocsNavItem[] = convertToNavItems(data?.allFile?.group, location);
    return organizeNavItems(navItems);
  }, [data?.allFile?.group, location]);

  return (
    <div
      className={classnames('c-navigation', {
        'c-navigation--open': isMobile && isMobileNavOpen,
      })}
    >
      <UsaBanner className="ds-u-display--block ds-u-md-display--none" />
      <header className="c-navigation__header ds-u-md-display--block ds-u-md-display--none">
        <Button
          className="ds-u-md-display--none ds-u-padding-left--0 ds-u-padding-right--1"
          variation="ghost"
          aria-expanded={isMobileNavOpen}
          aria-controls="c-navigation__menu"
          onClick={toggleMenu}
        >
          {isMobileNavOpen ? (
            <CloseIconThin className="ds-u-font-size--xl" />
          ) : (
            <MenuIconThin className="ds-u-font-size--xl" />
          )}
        </Button>
        <div>
          <a className="c-navigation__title" href="/">
            CMS Design System
          </a>
        </div>
      </header>

      <div
        id="c-navigation__menu"
        // hidden attr applied on mobile breakpoints when nav is closed
        hidden={isMobile && !isMobileNavOpen}
      >
        <div className="c-navigation__switchers-wrapper ds-u-display--none ds-u-md-display--block">
          <ThemeVersionSection />
        </div>
        <div className="c-navigation__links-wrapper">
          <SearchForm className="ds-u-md-display--none ds-u-margin--0 ds-u-padding-bottom--2" />
          <VerticalNav
            className="c-navigation__link-list"
            items={navItems}
            component={GatsbyLink}
            selectedId={location ? location.pathname : ''}
          />
          <p>
            <Link to="/blog/" className="c-navigation__bottom-link ds-c-link">
              <NewsIcon />
              What&apos;s new?
            </Link>
          </p>
          <p>
            <a
              href="https://github.com/CMSgov/design-system"
              className="c-navigation__bottom-link ds-c-link"
            >
              <GithubIcon />
              View code on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
