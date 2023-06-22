import React from 'react';
import { createContext, useState, useContext, useRef } from 'react';
import uniqueId from 'lodash/uniqueId';

export const DrawerContext = createContext(null);

export const DrawerManager = (props: any) => {
  const [currentID, setCurrentID] = useState(null);

  return <DrawerContext.Provider value={{ currentID, setCurrentID }} {...props} />;
};

export const useDrawerManager = () => {
  const { currentID, setCurrentID } = useContext(DrawerContext);
  const id = useRef(uniqueId('drawerManagerID')).current;

  const isOpen = currentID === id;
  const toggleClick = () => setCurrentID(isOpen ? null : id);
  const closeClick = () => setCurrentID(null);

  return { toggleClick, closeClick, isOpen };
};

export default DrawerManager;
