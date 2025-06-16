import React, { createContext, useContext, useState } from 'react';

const HoveredContentContext = createContext();

export const HoveredContentProvider = ({ children }) => {
  const [hoveredContent, setHoveredContent] = useState(null);

  return (
    <HoveredContentContext.Provider value={{ hoveredContent, setHoveredContent }}>
      {children}
    </HoveredContentContext.Provider>
  );
};

export const useHoveredContent = () => useContext(HoveredContentContext);