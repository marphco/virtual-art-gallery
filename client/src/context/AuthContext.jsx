import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('id_token'));

  const login = (token) => {
    localStorage.setItem('id_token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('id_token');
    setIsAuthenticated(false);
    window.location.assign('/login-signup'); // Redirect to login on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
