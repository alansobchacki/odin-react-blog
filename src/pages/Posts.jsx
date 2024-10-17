import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from '../hooks/Auth.jsx';

const Posts = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { loggedIn, isAdmin, hasToken, userName } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true); // temporary, tweak this logic later

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, published }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Post created successfully!");
      } else if (response.status === 401) { 
        alert("You are not authorized to create a post.");
      } else {
        alert(`Failed to create post: ${data.message}`);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      {loggedIn && hasToken && isAdmin && (
        <>
          <p>Hello, {userName}.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <input
              type="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              required
            />
            <button type="submit">Create Post</button>
          </form>
        </>
      )}
      {!loggedIn &&(
        <>
          <p>You are not logged in.</p>
          <button onClick={() => navigate("/")}>Return</button>
        </>
      )}
      {loggedIn && !isAdmin &&(
        <>
          <p>Only admins are allowed to create posts.</p>
          <button onClick={() => navigate("/")}>Return</button>
        </>
      )}
      {loggedIn && isAdmin && !hasToken && (
        <>
          <p>Your credentials have expired. Please log in again to write and publish posts.</p>
          <button onClick={() => navigate("/")}>Return</button>
        </>
      )}
    </>
  );
};

export default Posts;
