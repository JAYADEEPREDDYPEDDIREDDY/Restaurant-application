import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginMessage, setLoginMessage] = useState('');

  return (
    <LoginContext.Provider value={{ loginMessage, setLoginMessage }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
