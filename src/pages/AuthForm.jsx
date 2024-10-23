import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/Auth.jsx";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const { loggedIn, userName, isAdmin, login, logout } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupEmail,
          name: signupName,
          password: signupPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User created successfully!");
      } else {
        alert(`Failed to create user: ${data.message}`);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        alert("Login successful!");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {loggedIn ? (
        <>
          <p>Welcome, {userName}.</p>
          <button onClick={handleLogout}>Click here to logout</button>
          {isAdmin && (
            <button onClick={() => navigate("/posts")}>Write a new post</button>
          )}
        </>
      ) : (
        <>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>

          <form onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <input
              type="text"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </>
      )}
    </>
  );
};

export default LoginForm;
