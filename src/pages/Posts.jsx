import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/Auth.jsx';

const Posts = () => {
  const { loggedIn, isAdmin, hasToken, userName } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {loggedIn && hasToken && isAdmin && (
        <>
          <p>Hello, {userName}. You can post stuff now!</p>
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
