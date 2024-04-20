import React, { createContext, useContext, useState } from 'react';

const ConsecutiveLoginsContext = createContext();

export const useConsecutiveLogins = () => useContext(ConsecutiveLoginsContext);

export const ConsecutiveLoginsProvider = ({ children }) => {
  const [consecutiveDLs, setConsecutiveDLs] = useState(); // Set initial value as needed

  return (
    <ConsecutiveLoginsContext.Provider value={{ consecutiveDLs, setConsecutiveDLs }}>
      {children}
    </ConsecutiveLoginsContext.Provider>
  );
};