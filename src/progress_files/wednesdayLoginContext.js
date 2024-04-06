import React, { createContext, useContext, useState } from 'react';

const WednesdayLoginContext = createContext();

export const useWednesdayLogin = () => useContext(WednesdayLoginContext);

export const WednesdayLoginProvider = ({ children }) => {
  const [wednesdayLogin, setWednesdayLogin] = useState();

  return (
    <WednesdayLoginContext.Provider value={{ wednesdayLogin, setWednesdayLogin }}>
      {children}
    </WednesdayLoginContext.Provider>
  );
};