import React, { createContext, useContext, useState } from 'react';

const DailyLoginsContext = createContext();

export const useDailyLogins = () => useContext(DailyLoginsContext);

export const DailyLoginsProvider = ({ children }) => {
  const [dailyLogins, setDailyLogins] = useState(); // Set initial value as needed

  return (
    <DailyLoginsContext.Provider value={{ dailyLogins, setDailyLogins }}>
      {children}
    </DailyLoginsContext.Provider>
  );
};