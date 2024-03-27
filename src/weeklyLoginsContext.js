import React, { createContext, useContext, useState } from 'react';

const WeeklyLoginsContext = createContext();

export const useWeeklyLogins = () => useContext(WeeklyLoginsContext);

export const WeeklyLoginsProvider = ({ children }) => {
  const [weeklyLogins, setWeeklyLogins] = useState(
    {
        SundayLogin: false,
        MondayLogin: false,
        TuesdayLogin: false,
        WednesdayLogin: false,
        ThursdayLogin: false,
        FridayLogin: false,
        SaturdayLogin: false
    }
  ); // Set initial value as needed

  return (
    <WeeklyLoginsContext.Provider value={{ weeklyLogins, setWeeklyLogins }}>
      {children}
    </WeeklyLoginsContext.Provider>
  );
};