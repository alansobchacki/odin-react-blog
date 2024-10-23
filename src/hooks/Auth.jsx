import { useState, useEffect } from "react";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("user");

    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setLoggedIn(true);
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
    setIsAdmin(user.admin || false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserName("");
    setIsAdmin(false);
  };

  return { loggedIn, isAdmin, userName, login, logout };
};

export default useAuth;
