import React, { createContext, useContext, useState } from 'react';

const ShowNotificationContext = createContext();

export const useShowNotification = () => useContext(ShowNotificationContext);

export const ShowNotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(); // Set initial value as needed

  return (
    <ShowNotificationContext.Provider value={{ showNotification, setShowNotification }}>
      {children}
    </ShowNotificationContext.Provider>
  );
};