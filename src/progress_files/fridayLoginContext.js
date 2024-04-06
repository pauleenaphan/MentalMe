import React, { createContext, useContext, useState } from 'react';

const FridayLoginContext = createContext();

export const useFridayLogin = () => useContext(FridayLoginContext);

export const FridayLoginProvider = ({ children }) => {
  const [fridayLogin, setFridayLogin] = useState();

  return (
    <FridayLoginContext.Provider value={{ fridayLogin, setFridayLogin }}>
      {children}
    </FridayLoginContext.Provider>
  );
};