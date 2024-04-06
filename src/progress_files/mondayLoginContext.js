import React, { createContext, useContext, useState } from 'react';

const MondayLoginContext = createContext();

export const useMondayLogin = () => useContext(MondayLoginContext);

export const MondayLoginProvider = ({ children }) => {
  const [mondayLogin, setMondayLogin] = useState();

  return (
    <MondayLoginContext.Provider value={{ mondayLogin, setMondayLogin }}>
      {children}
    </MondayLoginContext.Provider>
  );
};