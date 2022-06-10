import React from 'react';
import { Link } from 'gatsby';
import { makePageUrl } from '../helpers/urlUtils';
import { removePositioning } from '../helpers/casingUtils';
import classnames from 'classnames';
import { VerticalNav } from '@cmsgov/design-system';
import { VerticalNavItemProps } from '@cmsgov/design-system/dist/components/VerticalNav/VerticalNavItem';
import { useStaticQuery, graphql } from 'gatsby';
import GithubLinks from './GithubLinks';
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
  isMobileNavOpen: boolean;
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
const DocSiteSidebar = ({ isMobileNavOpen, location }: DocSiteNavProps) => {
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
    <nav
      className={classnames('ds-l-md-col--3 ds-u-padding--2 ds-u-fill--white c-sidebar', {
        'c-sidebar--open': isMobileNavOpen,
      })}
    >
      <VerticalNav
        className="c-nav"
        items={navItems}
        component={GatsbyLink}
        selectedId={location ? location.pathname : ''}
      />
      <div className="ds-u-md-display--none ds-u-margin-top--2 c-sidebar__mobile-button-wrapper">
        <GithubLinks />
      </div>
    </nav>
  );
};

export default DocSiteSidebar;
