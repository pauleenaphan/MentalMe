import React, { createContext, useContext, useState } from 'react';

const ThursdayLoginContext = createContext();

export const useThursdayLogin = () => useContext(ThursdayLoginContext);

export const ThursdayLoginProvider = ({ children }) => {
  const [thursdayLogin, setThursdayLogin] = useState();

  return (
    <ThursdayLoginContext.Provider value={{ thursdayLogin, setThursdayLogin }}>
      {children}
    </ThursdayLoginContext.Provider>
  );
};