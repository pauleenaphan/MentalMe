import React, { createContext, useContext, useState } from 'react';

const ShowJournalNotificationContext = createContext();

export const useShowJournalNotification = () => useContext(ShowJournalNotificationContext);

export const ShowJournalNotificationProvider = ({ children }) => {
  const [showJournalNotification, setShowJournalNotification] = useState(); // Set initial value as needed

  return (
    <ShowJournalNotificationContext.Provider value={{ showJournalNotification, setShowJournalNotification }}>
      {children}
    </ShowJournalNotificationContext.Provider>
  );
};