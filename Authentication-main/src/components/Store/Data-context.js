import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const intialToken = localStorage.getItem("token");
  const [token, setToken] = useState(intialToken);
  const [timeoutId, setTimeoutId] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    resetTimeout();
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem(token);
    clearTimeout(timeoutId);
  };
  const resetTimeout = () => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(logoutHandler, 3000000);
    setTimeoutId(newTimeoutId);
  };
  useEffect(() => {
    resetTimeout();
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
