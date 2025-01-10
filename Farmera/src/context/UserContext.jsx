import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Replace with your user authentication logic

  // Mock sign-in function for testing
  const signIn = (userData) => {
    setUser(userData);
  };

  // Mock sign-out function
  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
