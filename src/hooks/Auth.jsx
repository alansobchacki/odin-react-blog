import { useState, useEffect } from "react";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    const currentUserToken = localStorage.getItem("token");

    if (currentUser && currentUserToken) {
      const userData = JSON.parse(currentUser);
      setLoggedIn(true);
      setHasToken(true);
      setUserName(userData.name);
      if (userData.admin) {
        setIsAdmin(true);
      }
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setLoggedIn(true);
    setUserName(user.name);
    setHasToken(true);
    setIsAdmin(user.admin || false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setLoggedIn(false);
    setHasToken(false);
    setUserName("");
    setIsAdmin(false);
  };

  return {
    loggedIn,
    isAdmin,
    hasToken,
    userName,
    login,
    logout,
  };
};

export default useAuth;
