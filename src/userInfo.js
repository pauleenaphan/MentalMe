import React, { createContext, useState, useContext } from 'react';

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <UserInfoContext.Provider value={{ userEmail, setUserEmail, userPassword, setUserPassword }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const getUserInfo = () => useContext(UserInfoContext);