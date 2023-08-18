import React from 'react';
import { createContext, useState, useContext } from 'react';
import useId from '../utilities/useId';

export const DrawerContext = createContext(null);

export const DrawerManager = (props: any) => {
  const [currentID, setCurrentID] = useState(null);

  return <DrawerContext.Provider value={{ currentID, setCurrentID }} {...props} />;
};

export const useDrawerManager = () => {
  const { currentID, setCurrentID } = useContext(DrawerContext);
  const id = useId();

  const isOpen = currentID === id;
  const toggleClick = () => setCurrentID(isOpen ? null : id);
  const closeClick = () => setCurrentID(null);

  return { toggleClick, closeClick, isOpen };
};

export default DrawerManager;
