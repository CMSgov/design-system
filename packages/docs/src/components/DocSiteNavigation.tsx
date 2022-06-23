import React from 'react';
import { Link } from 'gatsby';
import { makePageUrl } from '../helpers/urlUtils';
import { removePositioning } from '../helpers/casingUtils';
import classnames from 'classnames';
import { Button, CloseIconThin, MenuIconThin, VerticalNav } from '@cmsgov/design-system';
import { VerticalNavItemProps } from '@cmsgov/design-system/dist/components/VerticalNav/VerticalNavItem';
import { useStaticQuery, graphql } from 'gatsby';
import { LocationInterface } from '../helpers/graphQLTypes';

interface NavItem {
  id: string;
  name: string;
  relativeDirectory: string;
  relativePath: string;
}

interface GraphQlNavItem {
  fieldValue: string;
  edges: [
    {
      node: NavItem;
    }
  ];
}

interface DocSiteNavProps {
  location: LocationInterface;
}

/**
 * A wrapper for the gatsby link to handle internal site navigation
 * @param props {VerticalNavItemProps}
 * @returns gatsby link
 */
const GatsbyLink = (props: VerticalNavItemProps) => {
  return (
    <Link to={props.href} {...props}>
      {props.children}
    </Link>
  );
};

/**
 * DocSiteNav
 * queries all MDX files and generates the proper format to create a vertical nav
 * @returns {React Element}
 * @todo figure out which item is currently selected and mark & expand appropriately
 */
const DocSiteNavigation = ({ location }: DocSiteNavProps) => {
  // Open/close state is controlled by toggleMenu()
  const [isMobileNavOpen, setMobileNavOpen] = React.useState<boolean>(false);
  const toggleMenu = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  /*
   ** Need to know if screen width is at a medium breakpoint to set
   ** a11y attrs on mobile nav links - attrs not needed for desktop
   */
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  React.useEffect(() => {
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

  const data = useStaticQuery(graphql`
    query SiteNavQuery {
      allFile(
        sort: { fields: [relativeDirectory, name] }
        filter: { ext: { eq: ".mdx" }, relativeDirectory: { ne: "not-in-sidebar" } }
      ) {
        group(field: relativeDirectory) {
          fieldValue
          edges {
            node {
              id
              name
              relativeDirectory
              relativePath
            }
          }
        }
      }
    }
  `);

  /**
   * determines if the item name is included in the location pathname
   */
  const isItemSelected = (name: string) => {
    return location?.pathname.includes(name);
  };

  /**
   * Checks sub nav items to see if any are currently selected
   */
  const isSubNavItemSelected = (subNavItems) => {
    return subNavItems.some((navItem) => isItemSelected(navItem.url));
  };

  /**
   * Updating a name to remove kebab case & get rid of numeric ordering
   */
  const formatNavItemLabel = (name: string): string => {
    let newName = name.replace(/-/g, ' ');
    newName = removePositioning(newName);
    return newName;
  };

  const formatNavItemData = ({ name, relativePath }: NavItem) => {
    const url = makePageUrl(relativePath);
    return {
      label: formatNavItemLabel(name),
      url,
      id: url,
      selected: isItemSelected(url),
    };
  };

  const formatNavData = (dataList: GraphQlNavItem[]): VerticalNavItemProps[] => {
    const retVal: VerticalNavItemProps[] = [];
    dataList.forEach((dataItem) => {
      // for each level 1 item that has sub nav items
      if (dataItem.fieldValue.length) {
        // format all the level 2 items
        const subNavItems = dataItem.edges.map((subNavItem) => formatNavItemData(subNavItem.node));

        const labelText = formatNavItemLabel(dataItem.fieldValue);
        const isSelected = isItemSelected(dataItem.fieldValue);
        // add level 1 item & sub items
        retVal.push({
          label: labelText,
          items: subNavItems,
          defaultCollapsed: !isSubNavItemSelected(subNavItems),
          selected: isSelected,
        });
      } else {
        // for each level 1 item without sub nav items,
        // add each top level item
        dataItem.edges.forEach((navItemLvl1) => {
          retVal.push(formatNavItemData(navItemLvl1.node));
        });
      }
    });

    return retVal;
  };

  const navItems: VerticalNavItemProps[] = formatNavData(data?.allFile?.group);

  return (
    <div
      className={classnames('ds-l-md-col--3 ds-u-padding--0 ds-u-md-padding--2 c-navigation', {
        'c-navigation--open': isMobile && isMobileNavOpen,
      })}
    >
      <header className="c-navigation__header">
        <Button
          className="ds-u-md-display--none ds-u-padding-left--0 ds-u-padding-right--1"
          variation="transparent"
          aria-expanded={isMobileNavOpen}
          aria-controls="c-mobile-navigation"
          onClick={toggleMenu}
        >
          {isMobileNavOpen ? (
            <CloseIconThin className="ds-u-font-size--xl" />
          ) : (
            <MenuIconThin className="ds-u-font-size--xl" />
          )}
        </Button>
        <h1 className="c-navigation__title">
          <a href="/">CMS Design System</a>
        </h1>
      </header>

      <div
        id="c-mobile-navigation"
        // hidden attr applied on mobile breakpoints when nav is closed
        hidden={isMobile && !isMobileNavOpen}
        className="ds-u-padding--2 ds-u-md-padding--0"
      >
        <VerticalNav
          className="c-navigation__link-list"
          items={navItems}
          component={GatsbyLink}
          selectedId={location ? location.pathname : ''}
        />
        <a
          href="https://github.com/CMSgov/design-system"
          className="c-navigation__github-link ds-c-link"
        >
          View code on GitHub
        </a>
      </div>
    </div>
  );
};

export default DocSiteNavigation;
