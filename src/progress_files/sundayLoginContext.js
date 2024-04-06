  import React, { createContext, useContext, useState } from 'react';

  const SundayLoginContext = createContext();

  export const useSundayLogin = () => useContext(SundayLoginContext);

  export const SundayLoginProvider = ({ children }) => {
    const [sundayLogin, setSundayLogin] = useState();

    return (
      <SundayLoginContext.Provider value={{ sundayLogin, setSundayLogin }}>
        {children}
      </SundayLoginContext.Provider>
    );
  };