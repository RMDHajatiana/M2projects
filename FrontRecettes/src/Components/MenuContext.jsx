import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export function useMenuContext() {
  return useContext(MenuContext)
}

export function MenuProvider({ children }) {
  const [selectedMenuKey, setSelectedMenuKey] = useState(null);

  const selectMenu = (menuKey) => {
    setSelectedMenuKey(menuKey);
  }

  const value = {
    selectedMenuKey,
    selectMenu,
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}