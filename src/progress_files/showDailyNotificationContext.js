import React, { createContext, useContext, useState } from 'react';

const ShowDailyNotificationContext = createContext();

export const useShowDailyNotification = () => useContext(ShowDailyNotificationContext);

export const ShowDailyNotificationProvider = ({ children }) => {
  const [showDailyNotification, setShowDailyNotification] = useState(); // Set initial value as needed

  return (
    <ShowDailyNotificationContext.Provider value={{ showDailyNotification, setShowDailyNotification }}>
      {children}
    </ShowDailyNotificationContext.Provider>
  );
};