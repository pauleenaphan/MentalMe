import React, { createContext, useContext, useState } from 'react';

const ShowWeeklyNotificationContext = createContext();

export const useShowWeeklyNotification = () => useContext(ShowWeeklyNotificationContext);

export const ShowWeeklyNotificationProvider = ({ children }) => {
  const [showWeeklyNotification, setShowWeeklyNotification] = useState(); // Set initial value as needed

  return (
    <ShowWeeklyNotificationContext.Provider value={{ showWeeklyNotification, setShowWeeklyNotification }}>
      {children}
    </ShowWeeklyNotificationContext.Provider>
  );
};