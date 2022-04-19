import React from 'react';
import classnames from 'classnames';
import { VerticalNav } from '@cmsgov/design-system';
import { VerticalNavItemProps } from '@cmsgov/design-system/src/components/VerticalNav/VerticalNavItem';
import { useStaticQuery, graphql } from 'gatsby';
import GithubLinks from './GithubLinks';

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
}

/**
 * DocSiteSidebar
 * queries all MDX files and generates the proper format to create a vertical nav
 * @returns {React Element}
 * @todo figure out which item is currently selected and mark & expand appropriately
 * @todo Determine URL string for each item once content is integrated
 */
const DocSiteSidebar = ({ isMobileNavOpen }: DocSiteNavProps) => {
  const data = useStaticQuery(graphql`
    query SiteNavQuery {
      allFile(sort: { fields: [relativeDirectory, name] }) {
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
   * Updating a name to remove kebab case & get rid of numeric ordering
   */
  const formatNavItemLabel = (name: string): string => {
    let newName = name.replace(/-/g, ' ');
    newName = newName.replace(/\d+_/g, '');
    return newName;
  };

  const formatNavItemData = ({ name, id }: NavItem) => ({
    label: formatNavItemLabel(name),
    url: '',
    id,
  });

  const formatNavData = (dataList: GraphQlNavItem[]): VerticalNavItemProps[] => {
    const retVal: VerticalNavItemProps[] = [];
    dataList.forEach((dataItem) => {
      // for each level 1 item that has sub nav items
      if (dataItem.fieldValue.length) {
        // format all the level 2 items
        const subNavItems = dataItem.edges.map((subNavItem) => formatNavItemData(subNavItem.node));

        // add level 1 item & sub items
        retVal.push({
          label: formatNavItemLabel(dataItem.fieldValue),
          items: subNavItems,
          defaultCollapsed: true,
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
      <VerticalNav className="c-nav" items={navItems} />
      <div className="ds-u-md-display--none ds-u-margin-top--2 c-sidebar__mobile-button-wrapper">
        <GithubLinks />
      </div>
    </nav>
  );
};

export default DocSiteSidebar;
