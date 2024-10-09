import { useState, useEffect } from "react";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setLoggedIn(true);
      setUserName(userData.name);
      if (userData.admin) setIsAdmin(true);
    }

    if (token) setHasToken(true);
  }, []);

  return { loggedIn, isAdmin, hasToken, userName };
};

export default useAuth;
