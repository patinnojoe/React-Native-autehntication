import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create Context for authentication
export const AuthContext = createContext({
  email: '',
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

// wrapper for all components interacting with this context

const AuthContextProvider = ({ children }) => {
  // set state to update token
  const [authToken, setAuthToken] = useState();

  // function to set the token when user logs in
  const authenticate = (token) => {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  };

  // function to logout
  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  };

  // construct value to be passed to all context users
  const value = {
    token: authToken,
    logout: logout,
    authenticate: authenticate,
    isAuthenticated: !!authToken, //this converts a truthy or falsy value to a bool string of true or false
    email: '',
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
