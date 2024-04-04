import React, { createContext, useState, useContext } from 'react';

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <UserInfoContext.Provider value={{ userEmail, setUserEmail, userPassword, setUserPassword, userName, setUserName }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const getUserInfo = () => useContext(UserInfoContext);