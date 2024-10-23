import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/Auth.jsx";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, userName, isAdmin } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        alert("Login successful!");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      {loggedIn ? (
        <>
          <p>Welcome, {userName}.</p>
          <button>Click here to logout</button>
          {isAdmin && (
            <>
              <button onClick={() => navigate("/posts")}>
                Write a new post
              </button>
            </>
          )}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
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
      )}
    </>
  );
};

export default LoginForm;
