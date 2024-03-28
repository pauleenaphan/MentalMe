import React, { createContext, useContext, useState } from 'react';

const LongestStreakContext = createContext();

export const useLongestStreak = () => useContext(LongestStreakContext);

export const LongestStreakProvider = ({ children }) => {
  const [longestStreak, setLongestStreak] = useState(); // Set initial value as needed

  return (
    <LongestStreakContext.Provider value={{ longestStreak, setLongestStreak }}>
      {children}
    </LongestStreakContext.Provider>
  );
};