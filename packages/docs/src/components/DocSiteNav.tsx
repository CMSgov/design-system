import React from 'react';
import { VerticalNav } from '@cmsgov/design-system';
import { VerticalNavItemProps } from '@cmsgov/design-system/src/components/VerticalNav/VerticalNavItem';
import { useStaticQuery, graphql } from 'gatsby';

interface NavItem {
  id: string;
  name: string;
  relativeDirectory: string;
  relativePath: string;
}

/**
 * DocSiteNav
 * queries all MDX files and generates the proper format to create a vertical nav
 * @returns {React Element}
 * @todo figure out which item is currently selected and mark & expand appropriately
 * @todo Determine URL string for each item once content is integrated
 */
const DocSiteNav = () => {
  const data = useStaticQuery(graphql`
    query SiteNavQuery {
      allFile(
        filter: { absolutePath: {}, extension: { eq: "mdx" } }
        sort: { fields: [relativeDirectory, name] }
      ) {
        nodes {
          id
          name
          relativeDirectory
          relativePath
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

  const formatNavData = (dataList: NavItem[]): VerticalNavItemProps[] => {
    const dataObj = dataList.reduce((acc: any, dataItem) => {
      if (dataItem.relativeDirectory === '') {
        // for level 1 nav items that don't have a sub nav
        return {
          ...acc,
          [dataItem.id]: formatNavItemData(dataItem),
        };
      } else if (acc[dataItem.relativeDirectory]) {
        // for level 2 items where the level 1 exists in the accumulator
        acc[dataItem.relativeDirectory].items.push(formatNavItemData(dataItem));
        return { ...acc };
      } else {
        // for level 2 items where the level 1 item needs to be created
        return {
          ...acc,
          [dataItem.relativeDirectory]: {
            label: formatNavItemLabel(dataItem.relativeDirectory),
            items: [formatNavItemData(dataItem)],
            defaultCollapsed: true,
          },
        };
      }
    }, {});

    return Object.values(dataObj);
  };

  const navItems: VerticalNavItemProps[] = formatNavData(data?.allFile?.nodes);

  return (
    <div className="ds-l-md-col--3 ds-u-padding--2 ds-u-fill--white c-sidebar">
      <VerticalNav className="c-nav" items={navItems} />
    </div>
  );
};

export default DocSiteNav;
