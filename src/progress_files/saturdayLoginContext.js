  import React, { createContext, useContext, useState } from 'react';

  const SaturdayLoginContext = createContext();

  export const useSaturdayLogin = () => useContext(SaturdayLoginContext);

  export const SaturdayLoginProvider = ({ children }) => {
    const [saturdayLogin, setSaturdayLogin] = useState();

    return (
      <SaturdayLoginContext.Provider value={{ saturdayLogin, setSaturdayLogin }}>
        {children}
      </SaturdayLoginContext.Provider>
    );
  };