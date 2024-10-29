import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  FormTitle,
  InputField,
  FormButton,
} from "./AuthForm.styles.js";
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
    <MainContainer>
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
            <FormTitle>Login</FormTitle>
            <InputField
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <FormButton type="submit">Login</FormButton>
          </form>

          <form onSubmit={handleSignup}>
            <FormTitle>Don&apos;t have an account? Create one</FormTitle>
            <InputField
              type="text"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              placeholder="Name"
              required
            />
            <InputField
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <InputField
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <FormButton type="submit">Sign Up</FormButton>
          </form>
        </>
      )}
    </MainContainer>
  );
};

export default LoginForm;
