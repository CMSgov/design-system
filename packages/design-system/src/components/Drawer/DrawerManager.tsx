import React from 'react';
import { createContext, useState, useContext } from 'react';
import useId from '../utilities/useId';

export const DrawerContext = createContext(null);

/**
 * If you have multiple `<Drawer>`'s on a page, you can utilize the `<DrawerManager>`
 * context provider along with the `useDrawerManager()` hook to manage the state of these
 * drawers so that only one will remain open at a time. The hook provides functions to
 * open the drawer, close the drawer, and toggle it as well as a boolean that represents
 * its open status. This is the object the `useDrawerManager` hook returns:
 *
 * ```ts
 * {
 *   isDrawerOpen: boolean; // whether it's open
 *   openDrawer: () => any; // function that opens it
 *   closeDrawer: () => any; // function that closes it
 *   toggleDrawer: () => any; // funcntion that toggles it
 * }
 * ```
 *
 * Since this component utilizes React [Context](https://react.dev/learn/passing-data-deeply-with-context),
 * any number of components/content items can be within the `DrawerManager` provider and
 * will not be effected by it.
 *
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/drawer/).
 */
export const DrawerManager = (props: any) => {
  const [currentID, setCurrentID] = useState(null);

  return <DrawerContext.Provider value={{ currentID, setCurrentID }} {...props} />;
};

export const useDrawerManager = () => {
  const { currentID, setCurrentID } = useContext(DrawerContext);
  const id = useId();

  const isDrawerOpen = currentID === id;
  const openDrawer = () => setCurrentID(id);
  const closeDrawer = () => setCurrentID(null);
  const toggleDrawer = () => (isDrawerOpen ? closeDrawer() : openDrawer());

  return { openDrawer, closeDrawer, toggleDrawer, isDrawerOpen };
};

export default DrawerManager;
