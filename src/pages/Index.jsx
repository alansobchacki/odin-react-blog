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
import LoginPage from "./AuthForm.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [commentAuthorId, setCommentAuthorId] = useState(0);
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getAllPosts = async () => {
    try {
      const response = await fetch(`${apiUrl}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const writeNewComment = async (postId, author_id) => {
    try {
      console.log(`Trying to write a comment on post ${postId} from author ${author_id}`)

      const response = await fetch(`${apiUrl}/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ author_id, content }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Comment created successfully!");
        setContent("");
      } else if (response.status === 401) { 
        alert("You are not authorized to write comments.");
      } else {
        alert(`Failed to create comment: ${data.message}`);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getAllPosts();

    if (currentUser) {
      const userData = JSON.parse(currentUser);
      const authorId = userData.id;
      setCommentAuthorId(authorId);
    }
  }, [currentUser]);

  return (
    <MainContainer>
      <LeftContainer>
        <BlogLatestPosts>Latest Posts:</BlogLatestPosts>
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogPostContainer key={post.id}>
              <BlogPostTitle>{post.title}</BlogPostTitle>
              <BlogPostMessage>{post.content}</BlogPostMessage>
              <button>Comment</button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    writeNewComment(post.id, commentAuthorId);
                    console.log(post);
                  }}
                >
                  <title>Login</title>
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your comment here."
                    required
                  />
                  <button type="submit">Submit Comment</button>
                </form>
              <>
                {post.comments && post.comments.length > 0 && (
                  <div>
                    <h4>Comments:</h4>
                    {post.comments.map((comment) => (
                      <div key={comment.id}>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            </BlogPostContainer>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </LeftContainer>
      <RightContainer>
        <LoginPage />
      </RightContainer>
    </MainContainer>
  );
};

export default MainPage;
