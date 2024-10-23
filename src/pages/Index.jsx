import { useEffect, useState } from "react";
import {
  MainContainer,
  LeftContainer,
  RightContainer,
  BlogLatestPosts,
  BlogPostContainer,
  BlogPostTitle,
  BlogPostMessage,
} from "./Index.styles.js";
import LoginPage from "./Login.jsx";
import SignupPage from "./Signup.jsx";
import useAuth from "../hooks/Auth.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const { loggedIn } = useAuth();

  const getPosts = async () => {
    try {
      const response = await fetch(`${apiUrl}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <MainContainer>
      <LeftContainer>
        <BlogLatestPosts>Latest Posts:</BlogLatestPosts>
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogPostContainer key={post.id}>
              <BlogPostTitle>{post.title}</BlogPostTitle>
              <BlogPostMessage>{post.content}</BlogPostMessage>
            </BlogPostContainer>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </LeftContainer>
      <RightContainer>
        <LoginPage />
        {!loggedIn && <SignupPage />}
      </RightContainer>
    </MainContainer>
  );
};

export default MainPage;
