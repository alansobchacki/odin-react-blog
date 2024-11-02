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
import useAuth from '../hooks/Auth.jsx';

const apiUrl = import.meta.env.VITE_API_URL;

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [commentAuthorId, setCommentAuthorId] = useState(0);
  const [commentAuthorName, setCommentAuthorName] = useState("");
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const { isAdmin } = useAuth();

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

  const writeNewComment = async (postId, author_id, author_name) => {
    try {
      const response = await fetch(`${apiUrl}/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ author_id, author_name, content }),
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

  const deleteComment = async (comment_id) => {
    try {
      if (isAdmin) {
        const response = await fetch(`${apiUrl}/comments/${comment_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ comment_id }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Comment deleted successfully!");
        } else if (response.status === 401) { 
          alert("You are not authorized to delete comments.");
        } else {
          alert(`Failed to delete comment: ${data.message}`); 
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();

    if (currentUser) {
      const { id: authorId, name: authorName } = JSON.parse(currentUser);

      setCommentAuthorId(authorId);
      setCommentAuthorName(authorName);
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    writeNewComment(post.id, commentAuthorId, commentAuthorName);
                    console.log(post);
                  }}
                >
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
                        {isAdmin && (
                          <button onClick={() => deleteComment(comment.id)}>-X- </button>
                        )}
                        <p>{comment.author_name}</p>
                        {comment.deleted ? (
                          <p>Commend deleted</p>
                        ) : (
                          <p>{comment.content}</p>
                        )}
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
