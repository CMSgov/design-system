import sortBy from 'lodash.sortby';
import { VerticalNavItemProps } from '@cmsgov/design-system/dist/components/VerticalNav/VerticalNavItem';
import { makePageUrl } from './urlUtils';
import { ContentDirectoryGroup, NavItem, LocationInterface } from './graphQLTypes';

// order of labels of level 1 items
const level1ItemOrder = [
  'getting started',
  'guidelines',
  'foundation',
  'components',
  'patterns',
  'layouts',
  'utilities',
  'migration guides',
];

/**
 * determines if the item name is included in the location pathname
 */
const isItemSelected = (name: string, location: LocationInterface) =>
  location?.pathname.includes(name.replace('.mdx', ''));

/**
 * Checks sub nav items to see if any are currently selected
 */
const isSubNavItemSelected = (subNavItems: VerticalNavItemProps[]) =>
  subNavItems.some((navItem) => navItem.selected);

/**
 * Updating a name to remove kebab case
 * Used for directory name nav items that do not have MDX files to define their names
 */
const formatNavItemLabel = (name: string): string => {
  return name.replace(/-/g, ' ');
};

/**
 * transforms from graphql structure to structure for <VerticalNav> `items` prop
 */
const formatNavItemData = ({ childMdx, relativePath }: NavItem, location: LocationInterface) => {
  const frontmatter = childMdx?.frontmatter;
  const name = frontmatter?.title || '';
  const url = makePageUrl(relativePath, location);
  return {
    label: formatNavItemLabel(name),
    url,
    id: relativePath,
    selected: isItemSelected(relativePath, location),
    order: frontmatter?.order || 0,
  };
};

/**
 * Need to nest level2 items that have subnav items under the relevant level1 items
 */
export const organizeNavItems = (dataList: VerticalNavItemProps[]): VerticalNavItemProps[] => {
  const level1ItemMap: { string?: VerticalNavItemProps } = {};
  const level2Items = [];

  // sort level1 vs level2 items into distinct variables from data list where they are combined
  dataList.forEach((dataItem: VerticalNavItemProps) => {
    if (dataItem.label.split('/').length > 1) {
      level2Items.push(dataItem);
    } else {
      level1ItemMap[dataItem.label] = dataItem;
    }
  });

  // iterate through level2 items and nest them under their level 1 parent
  level2Items.forEach((level2Item: VerticalNavItemProps) => {
    // sort level3 items by order then id / name
    level2Item.items = sortBy(level2Item.items, ['order', 'id']);

    const [level1Name, level2Name] = level2Item.label.split('/');

    level1ItemMap[level1Name].items.push({ ...level2Item, label: level2Name });

    if (!level2Item.defaultCollapsed) {
      // if any level2 item is default expanded, make sure that level1 item also gets default expanded
      level1ItemMap[level1Name].defaultCollapsed = level2Item.defaultCollapsed;
    }
  });

  const level1Items = Object.values(level1ItemMap);
  // at this point, all items should be properly nested
  //sort level2 items because they added to the end of list in previous nesting step
  level1Items.forEach((level1Item: VerticalNavItemProps) => {
    // sort items based on the order defined in frontmatter then id which is the file path for the item
    level1Item.items = sortBy(level1Item.items, ['order', 'id']);
  });

  level1Items.sort((itemA, itemB) => {
    return level1ItemOrder.indexOf(itemA.label) - level1ItemOrder.indexOf(itemB.label);
  });

  return Object.values(level1Items);
};

/**
 * re-structures graphQL object to VerticalNavItem structure
 * At the beginning and end of this function, all level1 1 & level 2 items are in the same list
 * `organizeNavItems()` is where they are nested & sorted
 */
export const convertToNavItems = (
  dataList: ContentDirectoryGroup[],
  location: LocationInterface
): VerticalNavItemProps[] => {
  const verticalNavItems: VerticalNavItemProps[] = [];
  dataList.forEach((dataItem: ContentDirectoryGroup) => {
    // format all the level 2 items
    const subNavItems = dataItem.edges.map((subNavItem) =>
      formatNavItemData(subNavItem.node, location)
    );
    // in order to sort properly, need to get the smallest level 3 order value and assign to level 2
    const subNavItemsOrderVals = subNavItems.map((subNavItem) => subNavItem.order);
    const orderVal = Math.min(...subNavItemsOrderVals);

    const labelText = formatNavItemLabel(dataItem.fieldValue);
    const isSelected = subNavItems.some((subNavItem) => subNavItem.selected);

    // add level 1 item & sub items
    verticalNavItems.push({
      label: labelText,
      items: subNavItems,
      defaultCollapsed: !isSubNavItemSelected(subNavItems),
      selected: isSelected,
      id: dataItem.fieldValue,
      order: orderVal,
    });
  });

  return verticalNavItems;
};
