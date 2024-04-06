  import React, { createContext, useContext, useState } from 'react';

  const TuesdayLoginContext = createContext();

  export const useTuesdayLogin = () => useContext(TuesdayLoginContext);

  export const TuesdayLoginProvider = ({ children }) => {
    const [tuesdayLogin, setTuesdayLogin] = useState();

    return (
      <TuesdayLoginContext.Provider value={{ tuesdayLogin, setTuesdayLogin }}>
        {children}
      </TuesdayLoginContext.Provider>
    );
  };