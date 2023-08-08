import React from 'react';
import { createContext, useState, useContext, useRef } from 'react';
import uniqueId from 'lodash/uniqueId';

export const FilterDialogContext = createContext(null);

/**
 * This is just copied and pasted from our unreleased `DrawerManager` component
 * and hook. I just want something that will make sure only one is open at a
 * time, but in the future this could possibly be expanded to help render
 * a UI for mobile where someone can click "View all filters" and get one
 * dialog that is an aggregate of all the individual ones.
 *
 * The problem I'm seeing with this strategy is that I can't actually render
 * the provider and use the hook within the same component. I could see someone
 * wanting to both define the FilterDialogManager and use the hook to manage
 * the individual dialogs in the set in the same component, which doesn't work.
 * This idea will need a lot of work. Going to leave it as-is for the doc site
 * prototype, though.
 */
export const FilterDialogManager = (props: any) => {
  const [currentID, setCurrentID] = useState(null);

  return <FilterDialogContext.Provider value={{ currentID, setCurrentID }} {...props} />;
};

export const useFilterDialogManager = () => {
  const { currentID, setCurrentID } = useContext(FilterDialogContext);
  const id = useRef(uniqueId('filterDialogManagerID')).current;

  const isOpen = currentID === id;
  const toggleClick = () => setCurrentID(isOpen ? null : id);
  const closeClick = () => setCurrentID(null);

  return { toggleClick, closeClick, isOpen };
};

export default FilterDialogManager;
