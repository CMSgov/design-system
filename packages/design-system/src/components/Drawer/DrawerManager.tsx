import { createContext, useState, useContext } from 'react';
import useId from '../utilities/useId';

export const DrawerContext = createContext(null);

/**
 * The `DrawerManager` feature is useful when there are multiple help drawer links on a
 * page, as it defines the behavior of what happens when a user already has one open and
 * tries to open another. The `DrawerManager` manages the simplest behavior of closing
 * all other drawers when a new one opens.
 *
 * At the top level of your app or page, you can
 * define a `<DrawerManager>` [_context provider_](https://react.dev/learn/passing-data-deeply-with-context)
 * and then in specific parts of your app that manage individual drawers, you can tap into
 * the management behavior by calling the `useDrawerManager` hook. The hook provides the
 * open/closed status of the drawer as well as functions for opening, closing, or toggling
 * the drawer.
 *
 * Here is a minimal example of implementation:
 *
 * ```tsx
 * import { Button, DrawerManager, useDrawerManager } from '@cmsgov/design-system';
 *
 * const ManagedDrawer = (props) => {
 *   const { toggleDrawer, closeDrawer, isDrawerOpen } = useDrawerManager();
 *
 *   return (
 *     <>
 *       <Drawer
 *         {...props}
 *         onCloseClick={closeDrawer}
 *         isOpen={isDrawerOpen}
 *       >
 *       <Button onClick={toggleDrawer}>Click to open drawer</Button>
 *     </>
 *   );
 * }
 *
 * // Using components that use the `useDrawerManager` hook inside an app that is
 * // wrapped in a `DrawerManager` context provider:
 *
 * function App() {
 *   return (
 *     <DrawerManager>
 *       ... any content
 *       <ManagedDrawer {...propsForDrawer1} />
 *       <ManagedDrawer {...propsForDrawer2} />
 *       <ManagedDrawer {...propsForDrawer3} />
 *     </DrawerManager>
 *   );
 * }
 * ```
 *
 * Here is a description of the object that the hook returns:
 *
 * ```ts
 * {
 *   isDrawerOpen: boolean; // whether it's open
 *   openDrawer: () => any; // function that opens it
 *   closeDrawer: () => any; // function that closes it
 *   toggleDrawer: () => any; // function that toggles it
 * }
 * ```
 *
 * [See also the documentation on the drawer component](https://design.cms.gov/components/drawer/).
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
